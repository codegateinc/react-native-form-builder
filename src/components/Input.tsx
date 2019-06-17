import React from 'react'
import { View, TextInput, Text, TextInputProps, ViewStyle, TextStyle } from 'react-native'
import { Styles } from 'lib/types'
import { colors } from 'lib/common'
import { InputProps } from '../types'

const renderErrorText = (withError?: string, errorMessageStyles?: TextStyle)  => withError ? (
    <Text
        style={{
            ...styles.errorMessage,
            ...errorMessageStyles
        }}
    >
        {withError}
    </Text>
) : null

export const Input: React.FunctionComponent<InputProps> = props => {
    const { inputProps, withError, errorMessageStyles } = props
    const withErrorStyles = withError && !Boolean(inputProps!.secureTextEntry)
    const { style, ...otherInputProps } = inputProps as TextInputProps

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
    },
    errorMessage: {
        paddingHorizontal: 2,
        color: colors.red,
        fontSize: 11,
        paddingTop: 5,
    }
}
