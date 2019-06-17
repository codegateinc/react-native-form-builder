import React from 'react';
import { View, TouchableOpacity, Image, Text, Modal, Picker } from 'react-native';
import { ModalAnimation } from 'lib/types';
import { colors } from 'lib/common';
import { R } from 'lib/utils';
import { Label } from './Label';
// todo add arrow down or maybe as a props ?
const arrowDown = 0; // require('lib/assets/icons/arrow-down.png')
export class SelectPicker extends React.Component {
    constructor(props) {
        super(props);
        const [firstOption] = this.props.pickerOptions;
        const selectedOption = R.isDefined(this.props.selectedOption)
            ? this.props.selectedOption
            : firstOption
                ? firstOption.value
                : undefined;
        this.state = {
            isModalVisible: false,
            selectedOption
        };
        this.confirmSelection = this.confirmSelection.bind(this);
    }
    toggleModalVisibility(isModalVisible) {
        this.setState({
            isModalVisible,
            selectedOption: !isModalVisible ? this.props.selectedOption : this.state.selectedOption
        });
    }
    confirmSelection() {
        if (this.props.onSuccess) {
            this.props.onSuccess(this.state.selectedOption);
        }
        this.setState({
            isModalVisible: false
        });
    }
    getLabelForSelectedOption(selectedOption) {
        if (!R.isDefined(selectedOption)) {
            return undefined;
        }
        const option = this.props.pickerOptions.find(option => option.value === selectedOption);
        return option
            ? option.label
            : undefined;
    }
    renderSelectedOptionPreview() {
        const selectedOptionLabel = this.getLabelForSelectedOption(this.props.selectedOption);
        const previewText = selectedOptionLabel
            ? selectedOptionLabel
            : this.props.placeholder || '';
        return (<View style={styles.previewContainer}>
                <Text style={{
            ...styles.previewText,
            ...selectedOptionLabel ? styles.selectedText : {}
        }}>
                    {previewText}
                </Text>
                <Image source={arrowDown} style={styles.arrowDown}/>
            </View>);
    }
    renderPickerHeader() {
        // todo move static texts to props
        return (<View style={styles.pickerHeaderContainer}>
                <Text style={styles.actionButton} onPress={() => this.toggleModalVisibility(false)}>
                    {'Cancel'}
                </Text>
                <Text style={styles.pickerTitle}>
                    {this.props.pickerTitle}
                </Text>
                <Text style={styles.actionButton} onPress={this.confirmSelection}>
                    {'Done'}
                </Text>
            </View>);
    }
    renderPickerOption(option) {
        return (<Picker.Item key={option.value} value={option.value} label={option.label}/>);
    }
    renderPicker() {
        return this.props.pickerOptions ? (<View style={styles.pickerContainer}>
                {this.renderPickerHeader()}
                <Picker selectedValue={this.state.selectedOption} onValueChange={option => this.setState({
            selectedOption: option
        })}>
                    {this.props.pickerOptions.map(this.renderPickerOption)}
                </Picker>
            </View>) : null;
    }
    renderPickerOptions() {
        return (<Modal transparent visible={this.state.isModalVisible} animationType={ModalAnimation.Fade}>
                <View style={styles.modalBody}>
                    <TouchableOpacity style={styles.backdropButton} onPress={() => this.toggleModalVisibility(false)}/>
                    {this.renderPicker()}
                </View>
            </Modal>);
    }
    renderErrorMessage() {
        return this.props.hasError ? (<Text style={styles.errorMessage}>
                {this.props.hasError}
            </Text>) : null;
    }
    renderLabel() {
        return this.props.withLabel ? (<Label text={this.props.withLabel}/>) : null;
    }
    render() {
        return (<View style={{
            ...styles.container,
            ...this.props.customContainerStyles
        }}>
                {this.renderLabel()}
                <TouchableOpacity activeOpacity={1} style={styles.fakeSelect} onPress={!this.props.isDisabled ? () => this.toggleModalVisibility(true) : undefined}>
                    {this.renderSelectedOptionPreview()}
                </TouchableOpacity>
                {this.renderErrorMessage()}
                {this.renderPickerOptions()}
            </View>);
    }
}
SelectPicker.defaultProps = {
    pickerTitle: '',
    pickerOptions: [],
    customContainerStyles: {}
};
const styles = {
    container: {
        width: '100%'
    },
    fakeSelect: {
        width: '100%',
        height: 36,
        borderRadius: 4,
        backgroundColor: colors.lightPrimary,
        paddingHorizontal: 15,
        paddingVertical: 7,
        fontSize: 17,
        color: colors.midnightBlue,
        justifyContent: 'center'
    },
    previewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    previewText: {
        fontSize: 17,
        color: colors.gray
    },
    selectedText: {
        color: colors.midnightBlue
    },
    arrowDown: {
        width: 8,
        height: 4,
        marginTop: 9
    },
    modalBody: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.customBlackTransparent(0.45)
    },
    backdropButton: {
        flex: 1,
    },
    pickerContainer: {
        flex: 1,
        maxHeight: 263,
        backgroundColor: colors.white
    },
    pickerHeaderContainer: {
        paddingVertical: 18,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pickerTitle: {
        fontSize: 14,
        color: colors.midnightBlue,
        fontWeight: '600'
    },
    actionButton: {
        color: colors.red,
        fontSize: 17,
        fontWeight: '500'
    },
    errorMessage: {
        paddingHorizontal: 2,
        color: colors.red,
        fontSize: 11,
        paddingTop: 5,
    }
};
