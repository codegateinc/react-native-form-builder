import React from 'react'
import { View, TextInput, TextInputProps, ViewStyle, TextStyle } from 'react-native'
import { Styles } from 'lib/types'
import { colors } from 'lib/common'
import { InputProps } from '../types'
import { ErrorMessage } from './ErrorMessage'

const renderErrorText = (withError?: string, errorMessageStyles?: TextStyle)  => (
    <ErrorMessage
        text={withError}
        style={errorMessageStyles}
    />
)

export const Input: React.FunctionComponent<InputProps> = props => {
    const { inputProps, withError, errorMessageStyles } = props
    const { style, secureTextEntry, ...otherInputProps } = inputProps as TextInputProps
    const withErrorStyles = withError && !Boolean(secureTextEntry)

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={{
                        ...styles.input,
                        ...withErrorStyles ? styles.errorInput : {},
                        ...(style as ViewStyle)
                    }}
                    clearButtonMode="always"
                    secureTextEntry={secureTextEntry}
                    {...otherInputProps}
                />
            </View>
            {renderErrorText(withError, errorMessageStyles)}
        </View>
    )
}

Input.defaultProps = {
    errorMessageStyles: {},
    inputProps: {
        style: {}
    }
}

const styles: Styles = {
    container: {
        width: '100%'
    },
    inputWrapper: {
        width: '100%'
    },
    input: {
        width: '100%',
        height: 36,
        borderRadius: 4,
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingVertical: 7,
        fontSize: 17,
        color: colors.midnightBlue
    },
    errorInput: {
        color: colors.red
    }
}
