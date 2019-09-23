import React from 'react'
import { TextStyle, TouchableWithoutFeedback } from 'react-native'
import { CheckboxProps } from '../types'
import { ErrorMessage } from './ErrorMessage'

const renderErrorText = (withError?: string, errorMessageStyles?: TextStyle)  => (
    <ErrorMessage
        text={withError}
        style={errorMessageStyles}
    />
)

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
    renderComponent,
    isSelected,
    withError,
    errorMessageStyles,
    onChange
}) => renderComponent ? (
    <TouchableWithoutFeedback onPress={onChange}>
        {renderComponent(Boolean(isSelected))}
        {renderErrorText(withError, errorMessageStyles)}
    </TouchableWithoutFeedback>
) : null

Checkbox.defaultProps = {
    errorMessageStyles: {}
}
