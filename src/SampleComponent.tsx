import React from 'react'
import { Text } from 'react-native'
import { SampleComponentProps } from './types'

export const SampleComponent: React.FunctionComponent<SampleComponentProps> = ({ text }) => (
    <Text>
        {text}
    </Text>
)