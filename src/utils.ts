import { R } from 'lib/utils'
import { FormConfig, FormField, FormState, FieldState } from './types'

export const prepareFormInitialState = (formConfig: FormConfig) => {
    const preparedPairs = R.toPairs(formConfig)
        .map(([ fieldName, config ]) => {
            if (config.fieldType === FormField.Input) {
                const isValidInputValue = R.is(String, config.value) || R.is(Number, config.value)

                return [fieldName, {
                    isValid: Boolean(config.value),
                    isRequired: config.isRequired,
                    value: isValidInputValue ? config.value : '',
                    fieldType: config.fieldType
                }]
            }

            // Checkbox, SelectPicker and HorizontalOptionPicker has same initial state props
            const validatedValue = R.cond([
                [
                    ({ fieldType }) => fieldType === FormField.Checkbox,
                    ({ value }) => R.is(Boolean, value) ? value : false
                ],
                [
                    ({ fieldType }) => fieldType === FormField.SelectPicker,
                    ({ options, value }) => {
                        const isValidValue = options.some(option => option.value === value)

                        return isValidValue ? value : undefined
                    }
                ]
            ])(config)

            return [fieldName, {
                isRequired: config.isRequired,
                fieldType: config.fieldType,
                value: validatedValue,
            }]
        }) as Array<[string, FieldState]>

    return R.fromPairs(preparedPairs)
}

export const validateFormFields = (form: FormState) => {
    const fieldsToCheck = R
        .toPairs(form)
        .filter(([, { isRequired, fieldType }]) => isRequired && fieldType !== FormField.Input)
        .reduce((acc, [, fieldObject]) => {
            const newValues = R.cond([
                [
                    R.isEqual(FormField.Checkbox),
                    R.always({
                        checkboxes: [...acc.checkboxes, fieldObject]
                    })
                ],
                [
                    R.isEqual(FormField.SelectPicker),
                    R.always({
                        selectPickers: [...acc.selectPickers, fieldObject]
                    })
                ]
            ])(fieldObject.fieldType)

            return {
                ...acc,
                ...newValues
            }
        }, {
            checkboxes: [],
            selectPickers: [],
            horizontalPickers: []
        })

    const areCheckboxesValid = fieldsToCheck.checkboxes
        .every(({ value }) => Boolean(value))

    const areSelectPikersValid = fieldsToCheck.selectPickers
        .map(({ value }) => R.isDefined(value))
        .every(Boolean)

    const areHorizontalPickersValid = fieldsToCheck.horizontalPickers
        .map(({ value }) => R.isDefined(value))
        .every(Boolean)

    return R.all(
        areCheckboxesValid,
        areSelectPikersValid,
        areHorizontalPickersValid
    )
}
