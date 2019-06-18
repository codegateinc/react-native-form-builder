import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type Styles = {
    [key: string]: ViewStyle & TextStyle & ImageStyle
}
