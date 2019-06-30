import React, { Fragment } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Styles } from 'lib/types'
import { CustomPickerOption, CustomPickerProps, CustomPickerState } from '../types'
import { ErrorMessage } from './ErrorMessage'

export class CustomPicker extends React.Component<CustomPickerProps, CustomPickerState> {
    state: CustomPickerState = {
        isPickerVisible: Boolean(this.props.isPickerAlwaysVisible)
    }

    constructor(props: CustomPickerProps) {
        super(props)

        this.onOptionPress = this.onOptionPress.bind(this)
        this.setPickerVisibility = this.setPickerVisibility.bind(this)
    }

    setPickerVisibility() {
        if (Boolean(this.props.isPickerAlwaysVisible)) {
            return
        }

        this.setState({
            isPickerVisible: !this.state.isPickerVisible
        })
    }

    onOptionPress(option: CustomPickerOption) {
        if (this.props.onOptionChange) {
            this.props.onOptionChange({
                ...option,
                isSelected: !Boolean(option.isSelected)
            })
        }
    }

    renderPlaceholderComponent() {
        if (!this.props.renderPlaceholderComponent || !this.props.options) {
            return null
        }

        const selectedOptions = this.props.options.filter(option => Boolean(option.isSelected))

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.setPickerVisibility}
            >
                <Fragment>
                    {this.props.renderPlaceholderComponent(selectedOptions, this.state.isPickerVisible)}
                </Fragment>
            </TouchableOpacity>
        )
    }

    renderPickerComponent() {
        if (!this.props.options) {
            throw new Error('options are mandatory')
        }

        return this.state.isPickerVisible ? (
            <Fragment>
                {this.props.renderPickerComponent(this.props.options, this.onOptionPress)}
            </Fragment>
        ): null
    }

    renderError() {
       return (
           <ErrorMessage
                text={this.props.withError}
                style={this.props.customErrorStyle}
           />
       )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderPlaceholderComponent()}
                {this.renderPickerComponent()}
                {this.renderError()}
            </View>
        )
    }
}

const styles: Styles = {
    container: {
        width: '100%'
    }
}
