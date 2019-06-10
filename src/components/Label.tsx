import React from 'react'
import { Text, TextStyle } from 'react-native'
import { Styles } from 'lib/types'
import { colors } from 'lib/common'

type LabelProps = {
    text: string,
    customTextStyles?: TextStyle
}

export const Label: React.FunctionComponent<LabelProps> = ({ text, customTextStyles }) => (
    <Text
        style={{
            ...styles.label,
            ...customTextStyles
        }}
    >
        {text}
    </Text>
)

Label.defaultProps = {
    customTextStyles: {}
}

const styles: Styles = {
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.midnightBlue,
        paddingHorizontal: 2,
        marginBottom: 5
    }
}