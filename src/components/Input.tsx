import React from 'react'
import { View, TextInput, Text, TextInputProps, ImageSourcePropType, Image, ViewStyle } from 'react-native'
import { R } from 'lib/utils'
import { Styles } from 'lib/types'
import { colors } from 'lib/common'
import { Label } from './Label'
import { InputProps } from '../types'

export class Input extends React.Component<InputProps> {
    static defaultProps: Partial<InputProps> = {
        customContainerStyles: {},
        customIconStyles: {},
        inputProps: {
            style: {}
        }
    }

    renderInputIcon(iconImageSource?: ImageSourcePropType) {
        return R.isDefined(iconImageSource) ? (
            <Image
                resizeMode="contain"
                style={{
                    ...styles.iconImage,
                    ...this.props.customIconStyles
                }}
                source={iconImageSource as ImageSourcePropType}
            />
        ) : null
    }

    renderInputLabel(withLabel?: string) {
        return withLabel ? (
            <Label text={withLabel} />
        ) : null
    }

    renderErrorText(withError?: string) {
        return withError ? (
            <Text style={styles.errorMessage}>
                {withError}
            </Text>
        ) : null
    }

    render() {
        const { inputProps, customContainerStyles, withLabel, withError, withIcon } = this.props
        const withErrorStyles = withError && !Boolean(inputProps!.secureTextEntry)
        const { style, ...otherInputProps } = inputProps as TextInputProps

        return (
            <View
                style={{
                    ...styles.container,
                    ...customContainerStyles
                }}
            >
                {this.renderInputLabel(withLabel)}
                <View style={styles.inputWrapper}>
                    {this.renderInputIcon(withIcon)}
                    <TextInput
                        style={{
                            ...styles.input,
                            ...withErrorStyles ? styles.errorInput : {},
                            ...R.isDefined(withIcon) ? styles.inputWithIcon : {},
                            ...(style as ViewStyle)
                        }}
                        clearButtonMode="always"
                        {...otherInputProps}
                    />
                </View>
                {this.renderErrorText(withError)}
            </View>
        )
    }
}

Input.defaultProps = {
    customContainerStyles: {},
    inputProps: {
        style: {}
    }
}

const styles: Styles = {
    container: {
        width: '100%'
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.midnightBlue,
        paddingHorizontal: 2,
        marginBottom: 5
    },
    inputWrapper: {
        width: '100%'
    },
    input: {
        width: '100%',
        height: 36,
        borderRadius: 4,
        backgroundColor: colors.lightPrimary,
        paddingHorizontal: 15,
        paddingVertical: 7,
        fontSize: 17,
        color: colors.midnightBlue
    },
    inputWithIcon: {
        paddingLeft: 29
    },
    errorInput: {
        color: colors.red
    },
    errorMessage: {
        paddingHorizontal: 2,
        color: colors.red,
        fontSize: 11,
        paddingTop: 5,
    },
    iconImage: {
        position: 'absolute',
        width: 14,
        height: 14,
        left: 8,
        top: 11,
        zIndex: 2
    }
}
