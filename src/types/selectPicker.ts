import { ViewStyle } from 'react-native'
import { OptionValue } from './form'

export type PickerOption = {
    value: OptionValue,
    label: string
}

export type SelectPickerProps = {
    selectedOption?: OptionValue,
    pickerOptions?: Array<PickerOption>,
    pickerTitle?: string,
    hasError?: string,
    formFieldName?: string,
    withLabel?: string,
    placeholder?: string,
    isDisabled?: boolean,
    customContainerStyles?: ViewStyle
    onSuccess?(selectedOption?: OptionValue): void
}
