import { TextInputProps } from 'react-native'
import { PickerOption } from './selectPicker'

export type OptionValue = number | string

export enum FormField {
    Input = 0,
    Checkbox = 1,
    SelectPicker = 2
}

export type FormFieldValidationRule = {
    errorMessage: string
    validationFunction(text: string): boolean,
}

type FormFieldBase = {
    isRequired: boolean,
    fieldType: FormField
}

export interface FormInputConfigProps extends FormFieldBase {
    label?: string,
    value: string,
    inputProps?: TextInputProps,
    validationRules?: Array<FormFieldValidationRule>,
    liveParser?(value: string): string,
    submitParser?(value: string): string
}

export interface FormCheckboxConfigProps extends FormFieldBase {
    value: boolean,
    errorMessage?: string
}

export interface FormSelectPickerConfigProps extends FormFieldBase {
    label?: string,
    value?: OptionValue,
    pickerTitle?: string
    errorMessage?: string,
    placeholder?: string,
    options: Array<PickerOption>
}

export type FieldConfig = FormInputConfigProps | FormCheckboxConfigProps | FormSelectPickerConfigProps

export type FormConfig = {
    [key: string]: FieldConfig
}

export interface FormInputState extends FormFieldBase {
    isValid: boolean,
    hasError?: string,
    value: string,
}

export interface FormCheckboxState extends FormFieldBase {
    value: boolean,
    hasError?: string
}

export interface FormSelectPickerState extends FormFieldBase {
    value?: OptionValue,
    hasError?: string
}

export type FieldState = FormInputState | FormCheckboxState | FormSelectPickerState

export type FormState = {
    [key: string]: FieldState
}
