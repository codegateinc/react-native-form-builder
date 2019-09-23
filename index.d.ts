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

export type FormCheckboxValidationRule = {
    errorMessage: string,
    validationFunction(isSelected: boolean): boolean
}

type FormFieldBase = {
    isRequired: boolean,
    fieldType: FormField
}

type InputCompareWith = {
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

export enum CustomPickerMode {
    Single = 0,
    Multi = 1,
}

export type CustomPickerValidationRule = {
    errorMessage: string
    validationFunction(selectedOptions: Array<CustomPickerOption>): boolean,
}

export interface FormCustomPickerConfigProps extends FormFieldBase {
    options: Array<CustomPickerOption>,
    pickerMode: CustomPickerMode,
    validationRules?: Array<CustomPickerValidationRule>
}


export interface FormCheckboxConfigProps extends FormFieldBase {
    value: boolean,
    validationRule?: FormCheckboxValidationRule
}

export type FieldConfig = FormInputConfigProps | FormCustomPickerConfigProps | FormCheckboxConfigProps

export type FormConfig = {
    [key: string]: FieldConfig
}

interface FormInputState extends FormFieldBase {
    isValid: boolean,
    hasError?: string,
    value: string,
}

interface FormCustomPickerState extends FormFieldBase {
    options: Array<CustomPickerOption>,
    hasError?: string
}

export interface FormCheckboxState extends FormFieldBase {
    hasError?: string,
    value: boolean,
    isPristine: boolean
}

type FieldState = FormInputState | FormCustomPickerState | FormCheckboxState

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

export type TogglePickerVisibilityState = (isVisible: boolean) => void
export type RenderPlaceholderComponent = (selectedOptions: Array<CustomPickerOption>, isPickerVisible: boolean, togglePicker: TogglePickerVisibilityState) => ReactNode

type CustomPickerState = {
    isPickerVisible: boolean,
}

export type OnCustomPickerOptionPress = (option: CustomPickerOption) => void

type CustomPickerProps = {
    withError?: string,
    customErrorStyle?: TextStyle,
    formFieldName?: string,
    onOptionChange?: OnCustomPickerOptionPress,
    isPickerAlwaysVisible?: boolean,
    options?: Array<CustomPickerOption>,
    renderPlaceholderComponent?: RenderPlaceholderComponent,
    renderPickerComponent(options: Array<CustomPickerOption>, onOptionPress: OnCustomPickerOptionPress, togglePicker: TogglePickerVisibilityState): ReactNode,
}

// checkbox

export type RenderCheckboxComponent = (isSelected: boolean) => React.ReactNode
export type OnCheckboxChange = () => void

export type CheckboxProps = {
    isSelected?: boolean,
    withError?: string,
    formFieldName?: string,
    onChange?: OnCheckboxChange,
    renderComponent?: RenderCheckboxComponent,
    errorMessageStyles?: ViewStyle
}

// tslint:disable max-classes-per-file
export const Input: React.FunctionComponent<InputProps> = () => {}
export const Label: React.FunctionComponent<LabelProps> = () => {}
export const Checkbox: React.FunctionComponent<CheckboxProps> = () => {}
export class CustomPicker extends React.Component<CustomPickerProps, CustomPickerState> {}
export class Form<T = {}> extends React.Component<FormBuilderProps<T>, FormBuilderState> {
    submitForm(): T
    setCustomFieldError(fieldName: string, errorMessage: string): void
    hasChanges(): boolean
}
