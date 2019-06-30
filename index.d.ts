import React, { ReactNode } from 'react'
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

export type FormErrors = {
    [key: string]: string | number
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

type FieldConfig = FormInputConfigProps

export type FormConfig = {
    [key: string]: FieldConfig
}

interface FormInputState extends FormFieldBase {
    isValid: boolean,
    hasError?: string,
    value: string,
}

type FieldState = FormInputState

type FormBuilderState = {
    [key: string]: FieldState
}

type FormBuilderProps<T> = {
    isScrollable?: boolean,
    isLoading?: boolean,
    customFormContainerStyles?: ViewStyle,
    formConfig: FormConfig,
    onFormSubmit(form: T): void,
    onFormError?(errors: FormErrors): void
}

export enum FormField {
    Input = 0,
    CustomPicker = 1
}

export type CustomPickerOption = {
    value: string | number,
    label: string,
    isSelected?: boolean
}

type RenderPlaceholderComponent = (selectedOptions: Array<CustomPickerOption>, isPickerVisible: boolean) => ReactNode

type CustomPickerState = {
    isPickerVisible: boolean,
}

export type OnCustomPickerOptionPress = (option: CustomPickerOption) => void

type CustomPickerProps = {
    withError?: string,
    customErrorStyle?: TextStyle,
    onOptionChange?: OnCustomPickerOptionPress,
    isPickerAlwaysVisible?: boolean,
    options?: Array<CustomPickerOption>,
    renderPlaceholderComponent?: RenderPlaceholderComponent,
    renderPickerComponent(options: Array<CustomPickerOption>, onOptionPress: OnCustomPickerOptionPress): ReactNode,
}

// tslint:disable max-classes-per-file
export const Input: React.FunctionComponent<InputProps> = () => {}
export const Label: React.FunctionComponent<LabelProps> = () => {}
export class CustomPicker extends React.Component<CustomPickerProps, CustomPickerState> {}
export class Form<T = {}> extends React.Component<FormBuilderProps<T>, FormBuilderState> {
    submitForm(): T
    setCustomFieldError(fieldName: string, errorMessage: string): void
}
