import React, { Fragment } from 'react'
import { TextStyle, TouchableWithoutFeedback, Alert } from 'react-native'
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
    <TouchableWithoutFeedback
        onPress={() => {
            onChange!()
            Alert.alert(`isSelected: ${isSelected}`)
        }}
    >
        <Fragment>
            {renderComponent(Boolean(isSelected))}
            {renderErrorText(withError, errorMessageStyles)}
        </Fragment>
    </TouchableWithoutFeedback>
) : null

Checkbox.defaultProps = {
    errorMessageStyles: {}
}
