import React, { Fragment } from 'react'
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { R } from 'lib/utils'
import { Styles } from 'lib/types'
import { getFormErrors, prepareFormInitialState } from '../utils'
import {
    CustomPickerMode,
    CustomPickerOption,
    CustomPickerProps,
    FieldState,
    FormBuilderProps,
    FormBuilderState,
    FormCustomPickerConfigProps,
    FormCustomPickerState,
    FormField,
    FormInputConfigProps,
    FormInputState,
    InputCompareWith,
    InputProps
} from '../types'
import { Input } from './Input'
import { CustomPicker } from './CustomPicker'

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

        const areCustomPickersValid = R.toPairs(this.state.form)
            .filter(([, fieldObject]) => fieldObject.fieldType === FormField.CustomPicker)
            .map(([fieldName]) => this.validateCustomPicker(fieldName))
            .every(Boolean)

        return R.all(
            areInputsValid,
            areCustomPickersValid,
            !this.props.isLoading
        )
    }

    get hasValidCompares() {
        const inputsToCompare = R.toPairs(this.state.form)
            .filter(([ fieldName, fieldObject ]) =>
                fieldObject.fieldType === FormField.Input && Boolean((this.props.formConfig[fieldName] as FormInputConfigProps).compareWith)
            ) as Array<[string, FormInputState]>

        return inputsToCompare.length
            ? inputsToCompare
                .map(([ fieldName, fieldObject ]) => {
                    const fieldToCompare = ((this.props.formConfig[fieldName] as FormInputConfigProps).compareWith as InputCompareWith).fieldName

                    return fieldObject.value === (this.state.form[fieldToCompare] as FormInputState).value
                })
                .every(Boolean)
            : true
    }

    hasChanges() {
        return R.toPairs(this.state.form)
            .some(([, fieldObject]) => !fieldObject.isPristine)
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
            .filter(([fieldName, fieldObject]) =>
                fieldObject.isRequired ||
                (fieldObject.fieldType === FormField.Input && Boolean((fieldObject as FormInputState).value) && Boolean(this.props.formConfig[fieldName].validationRules))
            )
            .map(([fieldName, fieldObject]) => {
                if (fieldObject.fieldType === FormField.Input) {
                    const fieldProperties = fieldObject as FormInputState
                    const isValid = this.validateField(fieldName, fieldProperties.value as string)
                    const { compareWith } = this.props.formConfig[fieldName] as FormInputConfigProps

                    const hasError = R.cond([
                        [
                            () => !isValid,
                            () => this.getFieldErrorMessage(fieldName, fieldProperties.value as string)
                        ],
                        [
                            () => Boolean(compareWith),
                            () => fieldProperties.value !== (this.state.form[compareWith!.fieldName] as FormInputConfigProps).value
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
                }

                // CustomPicker

                const hasError = this.getCustomPickerErrorMessage(fieldName)

                return [fieldName, {
                    ...fieldObject,
                    hasError,
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

    getCustomPickerErrorMessage(fieldName: string) {
        const pickerConfig = this.props.formConfig[fieldName] as FormCustomPickerConfigProps

        if (!pickerConfig.validationRules) {
            return
        }

        const pickerState = this.state.form[fieldName] as FormCustomPickerState
        const selectedOptions = pickerState.options.filter(option => option.isSelected)

        const [errorMessage] = pickerConfig.validationRules
            .map(({ validationFunction, errorMessage }) => {
                const isValid = validationFunction(selectedOptions)

                return !isValid ? errorMessage : undefined
            })
            .filter(Boolean)

        return errorMessage
    }

    validateCustomPicker(fieldName: string) {
        const pickerConfig = this.props.formConfig[fieldName] as FormCustomPickerConfigProps

        if (!pickerConfig.validationRules) {
            return true
        }

        const pickerState = this.state.form[fieldName] as FormCustomPickerState
        const selectedOptions = pickerState.options.filter(option => option.isSelected)

        return pickerConfig.validationRules
            .map(({ validationFunction }) => validationFunction(selectedOptions))
            .every(Boolean)
    }

    submitForm() {
        Keyboard.dismiss()

        if (!this.isFormValid || !this.hasValidCompares) {
            return this.showErrorsOnSubmit()
        }

        const form = R.toPairs(this.state.form)
            .reduce((acc, [ fieldName, fieldObject ]) => {
                if (fieldObject.fieldType === FormField.Input) {
                    const inputStateProperties = fieldObject as FormInputState
                    const submitParser = (this.props.formConfig[fieldName] as FormInputConfigProps).submitParser

                    return {
                        ...acc,
                        [fieldName] : submitParser
                            ? submitParser((fieldObject as FormInputState).value)
                            : inputStateProperties.value
                    }
                }

                // CustomPicker
                return {
                    ...acc,
                    [fieldName] : (fieldObject as FormCustomPickerState).options
                        .filter(option => option.isSelected)
                        .map(option => option.value)
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

        const isPristine = !(value !== (this.props.formConfig[formFieldName] as FormInputConfigProps).value)

        this.setState({
            form: {
                ...this.state.form,
                [formFieldName]: {
                    ...this.state.form[formFieldName],
                    value: newValue,
                    isValid,
                    hasError: errorMessage,
                    isPristine
                }
            }
        })
    }

    onInputBlur(fieldName: string) {
        const currentValue = ((this.state.form[fieldName] as FormInputState).value).trim()
        const isValid = this.validateField(fieldName, currentValue)
        const errorMessage = !isValid ? this.getFieldErrorMessage(fieldName, currentValue) : undefined
        const isPristine = !(currentValue !== (this.props.formConfig[fieldName] as FormInputConfigProps).value)

        this.setState({
            form: {
                ...this.state.form,
                [fieldName]: {
                    ...this.state.form[fieldName],
                    isValid,
                    hasError: errorMessage,
                    value: currentValue,
                    isPristine
                } as FormInputState
            }
        })
    }

    handlePickerOptionChange(fieldName: string, option: CustomPickerOption) {
        const pickerConfig = this.props.formConfig[fieldName] as FormCustomPickerConfigProps
        const isSingleValueMode = pickerConfig.pickerMode === CustomPickerMode.Single
        const currentPickerState = this.state.form[fieldName] as FormCustomPickerState

        // todo handle isPristine in customPicker

        return this.setState({
            form: {
                ...this.state.form,
                [fieldName]: {
                    ...currentPickerState,
                    hasError: undefined,
                    isPristine: false,
                    options: currentPickerState.options.map(currentStateOption => {
                        if (isSingleValueMode) {
                            return currentStateOption.value === option.value
                                ? option
                                : {
                                    ...currentStateOption,
                                    isSelected: false
                                }
                        }

                        return currentStateOption.value === option.value
                            ? option
                            : currentStateOption
                    })
                }
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
                withError: this.state.form[fieldName].hasError,
                inputProps: {
                    editable: !Boolean(this.props.isLoading),
                    ...configProps.inputProps,
                    style: StyleSheet.flatten([formConfigStyles, customInputStyles]),
                    value: (this.state.form[fieldName] as FormInputState).value,
                    onChangeText: value => this.onTextChange(value, fieldName),
                    onBlur: () => this.onInputBlur(fieldName)
                }
            })
        }

        if (reactElementChild.type === CustomPicker) {
            const fieldName = reactElementChild.props.formFieldName
            const pickerState = (this.state.form[fieldName] as FormCustomPickerState)

            return React.cloneElement<CustomPickerProps>(reactElementChild, {
                ...reactElementChild.props,
                withError: this.state.form[fieldName].hasError,
                options: pickerState.options,
                onOptionChange: option => this.handlePickerOptionChange(fieldName, option)
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
        width: '100%'
    }
}
