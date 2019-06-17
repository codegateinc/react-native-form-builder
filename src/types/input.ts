import { TextInputProps, TextStyle } from 'react-native'

export type InputProps = {
    formFieldName?: string,
    inputProps?: TextInputProps,
    withError?: string,
    errorMessageStyles?: TextStyle
}
