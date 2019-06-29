import React, { Fragment } from 'react'
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { R } from 'lib/utils'
import { Styles } from 'lib/types'
import { prepareFormInitialState, getFormErrors } from '../utils'
import { FormField, FormInputConfigProps, FormInputState, FormBuilderState, FormBuilderProps, InputProps, FieldState, InputCompareWith } from '../types'
import { Input } from './Input'

type FormProps<T> = FormBuilderProps<T>

type FormState = {
    form: FormBuilderState
}

export class Form<T> extends React.Component<FormProps<T>, FormState> {
    static defaultProps: Partial<FormProps<{}>> = {
        customFormContainerStyles: {}
    }

    constructor(props: FormProps<T>) {
        super(props)

        this.state = {
            form: prepareFormInitialState(this.props.formConfig)
        }

        this.submitForm = this.submitForm.bind(this)
        this.renderChild = this.renderChild.bind(this)
        this.handleFormError = this.handleFormError.bind(this)
    }

    get isFormValid() {
        const areInputsValid = R.toPairs(this.state.form)
            .filter(([, fieldObject ]) => fieldObject.fieldType === FormField.Input)
            .map(([fieldName, fieldObject]) => this.validateField(fieldName, (fieldObject as FormInputState).value))
            .every(Boolean)

        return R.all(
            areInputsValid,
            !this.props.isLoading
        )
    }

    get hasValidCompares() {
        const inputsToCompare = R.toPairs(this.state.form)
            .filter(([ fieldName, fieldObject ]) =>
                fieldObject.fieldType === FormField.Input && Boolean(this.props.formConfig[fieldName].compareWith)
            )

        return inputsToCompare.length
            ? inputsToCompare
                .map(([ fieldName, fieldObject ]) => {
                    const fieldToCompare = (this.props.formConfig[fieldName].compareWith as InputCompareWith).fieldName

                    return fieldObject.value === this.state.form[fieldToCompare].value
                })
                .every(Boolean)
            : true
    }

    handleFormError() {
        if (this.props.onFormError) {
            const errors = getFormErrors(this.state.form)

            this.props.onFormError(errors)
        }
    }

    setCustomFieldError(fieldName: string, errorMessage: string) {
        this.setState({
            form: {
                ...this.state.form,
                [fieldName]: {
                    ...this.state.form[fieldName],
                    hasError: errorMessage,
                    isValid: false,
                } as FieldState
            }
        })
    }

    showErrorsOnSubmit() {
        const checkedFormFields = R
            .toPairs(this.state.form)
            .filter(([, fieldObject]) => fieldObject.isRequired)
            .map(([fieldName, fieldObject]) => {
                const isValid = this.validateField(fieldName, fieldObject.value as string)
                const { compareWith } = this.props.formConfig[fieldName]

                const hasError = R.cond([
                    [
                        () => !isValid,
                        () => this.getFieldErrorMessage(fieldName, fieldObject.value as string)
                    ],
                    [
                        () => Boolean(compareWith),
                        () => fieldObject.value !== this.state.form[compareWith!.fieldName].value
                            ? compareWith!.errorMessage
                            : undefined
                    ],
                    [
                        R.T,
                        R.always(undefined)
                    ]
                ])()

                return [fieldName, {
                    ...fieldObject,
                    isValid,
                    hasError
                }]
            })
            .reduce((acc, [fieldName, fieldObject]) => ({
                ...acc,
                [fieldName as string]: fieldObject
            }), {})

        this.setState({
            form: {
                ...this.state.form,
                ...checkedFormFields
            }
        }, this.handleFormError)
    }

    submitForm() {
        Keyboard.dismiss()

        if (!this.isFormValid || !this.hasValidCompares) {
            return this.showErrorsOnSubmit()
        }

        const form = R.toPairs(this.state.form)
            .reduce((acc, [ fieldName, fieldObject ]) => {
                const isInput = fieldObject.fieldType === FormField.Input

                if (isInput) {
                    const submitParser = (this.props.formConfig[fieldName] as FormInputConfigProps).submitParser

                    return {
                        ...acc,
                        [fieldName] : submitParser
                            ? submitParser((fieldObject as FormInputState).value)
                            : fieldObject.value
                    }
                }

                return {
                    ...acc,
                    [fieldName] : fieldObject.value
                }
            }, {}) as T

        this.props.onFormSubmit(form)
    }

    validateField(formFieldName: string, value: string) {
        const fieldConfig = (this.props.formConfig[formFieldName] as FormInputConfigProps)

        if (!fieldConfig.isRequired && !value) {
            return true
        }

        if (fieldConfig.validationRules) {
            return fieldConfig.validationRules
                .map(({ validationFunction }) => validationFunction(value))
                .every(Boolean)
        }

        return true
    }

    getFieldErrorMessage(formFieldName: string, value: string) {
        const fieldConfig = (this.props.formConfig[formFieldName] as FormInputConfigProps)

        if (!fieldConfig.isRequired && !value) {
            return
        }

        if (fieldConfig.validationRules) {
            const [errorMessage] = fieldConfig.validationRules
                .map(({ validationFunction, errorMessage }) => {
                    const isValid = validationFunction(value)

                    return !isValid ? errorMessage : undefined
                })
                .filter(Boolean)

            return errorMessage
        }

        return
    }

    onTextChange(value: string, formFieldName: string) {
        const formField = this.state.form[formFieldName] as FormInputState
        const shouldLiveCheck = Boolean(formField.hasError) || this.isFormValid
        const valueParser = (this.props.formConfig[formFieldName] as FormInputConfigProps).liveParser
        const newValue = valueParser
            ? valueParser(value)
            : value

        const isValid = shouldLiveCheck
            ? this.validateField(formFieldName, newValue)
            : formField.isValid

        const errorMessage = !isValid && shouldLiveCheck
            ? this.getFieldErrorMessage(formFieldName, newValue)
            : undefined

        this.setState({
            form: {
                ...this.state.form,
                [formFieldName]: {
                    ...this.state.form[formFieldName],
                    value: newValue,
                    isValid,
                    hasError: errorMessage
                }
            }
        })
    }

    onInputBlur(fieldName: string) {
        const currentValue = (this.state.form[fieldName].value as string).trim()
        const isValid = this.validateField(fieldName, currentValue)
        const errorMessage = !isValid ? this.getFieldErrorMessage(fieldName, currentValue) : undefined

        this.setState({
            form: {
                ...this.state.form,
                [fieldName]: {
                    ...this.state.form[fieldName],
                    isValid,
                    hasError: errorMessage,
                    value: currentValue
                } as FormInputState
            }
        })
    }

    renderChild(child: React.ReactNode) {
        if (R.is(String, child) || R.is(Number, child)) {
            return child
        }

        const reactElementChild = child as React.ReactElement<any> // tslint:disable-line no-any

        if (reactElementChild.type === Input) {
            const fieldName = reactElementChild.props.formFieldName
            const configProps = this.props.formConfig[fieldName] as FormInputConfigProps
            const { inputProps } = (reactElementChild as React.ReactElement<InputProps>).props
            const customInputStyles = inputProps && inputProps.style ? inputProps.style : {}
            const formConfigStyles = configProps.inputProps && configProps.inputProps.style ? configProps.inputProps.style : {}

            return React.cloneElement<InputProps>(reactElementChild, {
                ...reactElementChild.props,
                withError: (this.state.form[fieldName] as FormInputState).hasError,
                inputProps: {
                    editable: !Boolean(this.props.isLoading),
                    ...configProps.inputProps,
                    style: StyleSheet.flatten([formConfigStyles, customInputStyles]),
                    value: this.state.form[fieldName].value,
                    onChangeText: value => this.onTextChange(value, fieldName),
                    onBlur: () => this.onInputBlur(fieldName)
                }
            })
        }

        const reactElementChildren = reactElementChild.props.children

        if (reactElementChildren) {
            const newChildren = React.Children.map(reactElementChildren, this.renderChild)

            return React.cloneElement(reactElementChild, reactElementChild.props, newChildren)
        }

        return reactElementChild
    }

    renderForm() {
        const { children } = this.props

        if (!children) {
            throw new Error('children are mandatory')
        }

        return React.Children.map(this.props.children, this.renderChild)
    }

    renderScrollableForm() {
        return (
            <Fragment>
                <View style={styles.container}>
                    <ScrollView
                        style={{
                            ...styles.container,
                            ...this.props.customFormContainerStyles
                        }}
                        keyboardShouldPersistTaps="never"
                    >
                        {this.renderForm()}
                    </ScrollView>
                </View>
            </Fragment>
        )
    }

    renderRegularForm() {
        return (
            <Fragment>
                <View
                    style={{
                        ...styles.container,
                        ...this.props.customFormContainerStyles
                    }}
                >
                    {this.renderForm()}
                </View>
            </Fragment>
        )
    }

    render() {
        return this.props.isScrollable
            ? this.renderScrollableForm()
            : this.renderRegularForm()
    }
}

const styles: Styles = {
    container: {
        flex: 1
    }
}
