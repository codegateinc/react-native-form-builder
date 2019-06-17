import React from 'react';
import { Text } from 'react-native';
import { colors } from 'lib/common';
export const Label = ({ text, customTextStyles }) => (<Text style={{
    ...styles.label,
    ...customTextStyles
}}>
        {text}
    </Text>);
Label.defaultProps = {
    customTextStyles: {}
};
const styles = {
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.midnightBlue,
        paddingHorizontal: 2,
        marginBottom: 5
    }
};
