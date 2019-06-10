import { ImageSourcePropType, ImageStyle, TextInputProps, ViewStyle } from 'react-native'

export type InputProps = {
    formFieldName?: string,
    withLabel?: string,
    inputProps?: TextInputProps,
    withError?: string,
    withIcon?: ImageSourcePropType,
    customContainerStyles?: ViewStyle,
    customIconStyles?: ImageStyle
}
