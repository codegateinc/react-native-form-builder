import { TextInputProps, ViewStyle } from 'react-native'

type FormFieldBase = {
    isRequired: boolean,
    fieldType: FormField
}

export type FormErrors = {
    [key: string]: string | number
}

export type FormFieldValidationRule = {
    errorMessage: string
    validationFunction(text: string): boolean,
}

export enum FormField {
    Input = 0
}

export type InputCompareWith = {
    fieldName: string,
    errorMessage: string
}

export interface FormInputConfigProps extends FormFieldBase {
    value: string,
    inputProps?: TextInputProps,
    validationRules?: Array<FormFieldValidationRule>,
    compareWith?: InputCompareWith,
    liveParser?(value: string): string,
    submitParser?(value: string): string
}

// todo later there will be more types assigned to FieldConfig
export type FieldConfig = FormInputConfigProps

export type FormConfig = {
    [key: string]: FieldConfig
}

export interface FormInputState extends FormFieldBase {
    isValid: boolean,
    hasError?: string,
    value: string,
}

// todo later there will be more types assigned to FieldState
export type FieldState = FormInputState

export type FormBuilderState = {
    [key: string]: FieldState
}

export type FormBuilderProps<T> = {
    isScrollable?: boolean,
    isLoading?: boolean,
    customFormContainerStyles?: ViewStyle,
    formConfig: FormConfig,
    onFormSubmit(form: T): void,
    onFormError?(errors: FormErrors): void
}
