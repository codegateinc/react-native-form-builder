import React from 'react'
import { Text } from 'react-native'
import { Styles } from 'lib/types'
import { colors } from 'lib/common'
import { ErrorMessageProps } from '../types'

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ text, style }) => text ? (
    <Text
        style={{
            ...styles.errorMessage,
            ...style
        }}
    >
        {text}
    </Text>
) : null

ErrorMessage.defaultProps = {
    style: {}
}

const styles: Styles = {
    errorMessage: {
        paddingHorizontal: 2,
        color: colors.red,
        fontSize: 11,
        paddingTop: 5,
    }
}
