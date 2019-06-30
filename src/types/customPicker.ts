import { ReactNode } from 'react'
import { TextStyle } from 'react-native'

export enum CustomPickerMode {
    Single = 0,
    Multi = 1,
}

export type CustomPickerOption = {
    value: string | number,
    label: string,
    isSelected: boolean
}

export type CustomPickerValidationRule = {
    errorMessage: string
    validationFunction(selectedOptions: Array<CustomPickerOption>): boolean,
}

export type RenderPlaceholderComponent = (selectedOptions: Array<CustomPickerOption>, isPickerVisible: boolean) => ReactNode
export type OnCustomPickerOptionPress = (option: CustomPickerOption) => void

export type CustomPickerState = {
    isPickerVisible: boolean,
}

export type CustomPickerProps = {
    withError?: string,
    formFieldName?: string,
    customErrorStyle?: TextStyle,
    onOptionChange?: OnCustomPickerOptionPress,
    isPickerAlwaysVisible?: boolean,
    options?: Array<CustomPickerOption>,
    renderPlaceholderComponent?: RenderPlaceholderComponent,
    renderPickerComponent(options: Array<CustomPickerOption>, onOptionPress: OnCustomPickerOptionPress): ReactNode,
}
