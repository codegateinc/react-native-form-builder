import React from 'react'
import { ViewStyle } from 'react-native'

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
