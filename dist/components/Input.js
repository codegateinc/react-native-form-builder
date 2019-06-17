import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { colors } from 'lib/common';
const renderErrorText = (withError, errorMessageStyles) => withError ? (<Text style={{
    ...styles.errorMessage,
    ...errorMessageStyles
}}>
        {withError}
    </Text>) : null;
export const Input = props => {
    const { inputProps, withError, errorMessageStyles } = props;
    const withErrorStyles = withError && !Boolean(inputProps.secureTextEntry);
    const { style, ...otherInputProps } = inputProps;
    return (<View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput style={{
        ...styles.input,
        ...withErrorStyles ? styles.errorInput : {},
        ...style
    }} clearButtonMode="always" {...otherInputProps}/>
            </View>
            {renderErrorText(withError, errorMessageStyles)}
        </View>);
};
Input.defaultProps = {
    errorMessageStyles: {},
    inputProps: {
        style: {}
    }
};
const styles = {
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
};
