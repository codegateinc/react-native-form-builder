import React from 'react'
import { TextInputProps, TextStyle, ViewStyle } from 'react-native'

type InputProps = {
    formFieldName?: string,
    inputProps?: TextInputProps,
    withError?: string,
    errorMessageStyles?: TextStyle
}

type LabelProps = {
    text: string,
    customTextStyles?: TextStyle
}

export type FormFieldValidationRule = {
    errorMessage: string
    validationFunction(text: string): boolean,
}

type FormFieldBase = {
    isRequired: boolean,
    fieldType: FormField
}

type InputCompareWith = {
    fieldName: string,
    errorMessage: string
}

interface FormInputConfigProps extends FormFieldBase {
    value: string,
    inputProps?: TextInputProps,
    validationRules?: Array<FormFieldValidationRule>,
    compareWith?: InputCompareWith,
    liveParser?(value: string): string,
    submitParser?(value: string): string
}

// todo later there will be more types assigned to FieldConfig
type FieldConfig = FormInputConfigProps

export type FormConfig = {
    [key: string]: FieldConfig
}

interface FormInputState extends FormFieldBase {
    isValid: boolean,
    hasError?: string,
    value: string,
}

// todo later there will be more types assigned to FieldState
type FieldState = FormInputState

type FormBuilderState = {
    [key: string]: FieldState
}

type FormBuilderProps<T> = {
    isScrollable?: boolean,
    isLoading?: boolean,
    customFormContainerStyles?: ViewStyle,
    formConfig: FormConfig,
    onFormSubmit(form: T): void
}

export enum FormField {
    Input = 0
}

export const Input: React.FunctionComponent<InputProps> = () => {}
export const Label: React.FunctionComponent<LabelProps> = () => {}
export class Form<T = {}> extends React.Component<FormBuilderProps<T>, FormBuilderState> {
    submitForm(): T
    setCustomFieldError(fieldName: string, errorMessage: string): void
}
