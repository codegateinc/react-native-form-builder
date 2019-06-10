import React from 'react'
import { Text } from 'react-native'

type SampleComponentProps = {
    text: string
}

export const SampleComponent: React.FunctionComponent<SampleComponentProps> = ({ text }) => (
    <Text>
        {text}
    </Text>
)