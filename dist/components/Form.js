var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.Form=void 0;var _objectSpread11=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _utils=require("../lib/utils");var _utils2=require("../utils");var _types=require("../types");var _Input=require("./Input");var _CustomPicker=require("./CustomPicker");var _Checkbox=require("./Checkbox");var _jsxFileName="/Users/krystianpach/Documents/react-native-form-builder/src/components/Form.tsx";var Form=function(_React$Component){(0,_inherits2.default)(Form,_React$Component);function Form(props){var _this;(0,_classCallCheck2.default)(this,Form);_this=(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(Form).call(this,props));_this.state={form:(0,_utils2.prepareFormInitialState)(_this.props.formConfig)};_this.submitForm=_this.submitForm.bind((0,_assertThisInitialized2.default)(_this));_this.renderChild=_this.renderChild.bind((0,_assertThisInitialized2.default)(_this));_this.handleFormError=_this.handleFormError.bind((0,_assertThisInitialized2.default)(_this));return _this;}(0,_createClass2.default)(Form,[{key:"hasChanges",value:function hasChanges(){return _utils.R.toPairs(this.state.form).some(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),fieldObject=_ref2[1];return!fieldObject.isPristine;});}},{key:"handleFormError",value:function handleFormError(){if(this.props.onFormError){var errors=(0,_utils2.getFormErrors)(this.state.form);this.props.onFormError(errors);}}},{key:"setCustomFieldError",value:function setCustomFieldError(fieldName,errorMessage){this.setState({form:(0,_objectSpread11.default)({},this.state.form,(0,_defineProperty2.default)({},fieldName,(0,_objectSpread11.default)({},this.state.form[fieldName],{hasError:errorMessage,isValid:false})))});}},{key:"showErrorsOnSubmit",value:function showErrorsOnSubmit(){var _this2=this;var checkedFormFields=_utils.R.toPairs(this.state.form).filter(function(_ref3){var _ref4=(0,_slicedToArray2.default)(_ref3,2),fieldName=_ref4[0],fieldObject=_ref4[1];return fieldObject.isRequired||fieldObject.fieldType===_types.FormField.Input&&Boolean(fieldObject.value)&&Boolean(_this2.props.formConfig[fieldName].validationRules);}).map(function(_ref5){var _ref6=(0,_slicedToArray2.default)(_ref5,2),fieldName=_ref6[0],fieldObject=_ref6[1];if(fieldObject.fieldType===_types.FormField.Input){var fieldProperties=fieldObject;var isValid=_this2.validateField(fieldName,fieldProperties.value);var _ref7=_this2.props.formConfig[fieldName],compareWith=_ref7.compareWith;var hasError=_utils.R.cond([[function(){return!isValid;},function(){return _this2.getFieldErrorMessage(fieldName,fieldProperties.value);}],[function(){return Boolean(compareWith);},function(){return fieldProperties.value!==_this2.state.form[compareWith.fieldName].value?compareWith.errorMessage:undefined;}],[_utils.R.T,_utils.R.always(undefined)]])();return[fieldName,(0,_objectSpread11.default)({},fieldObject,{isValid:isValid,hasError:hasError})];}if(fieldObject.fieldType===_types.FormField.Checkbox){return[fieldName,(0,_objectSpread11.default)({},fieldObject,{hasError:_this2.getCheckboxErrorMessage(fieldName)})];}return[fieldName,(0,_objectSpread11.default)({},fieldObject,{hasError:_this2.getCustomPickerErrorMessage(fieldName)})];}).reduce(function(acc,_ref8){var _ref9=(0,_slicedToArray2.default)(_ref8,2),fieldName=_ref9[0],fieldObject=_ref9[1];return(0,_objectSpread11.default)({},acc,(0,_defineProperty2.default)({},fieldName,fieldObject));},{});this.setState({form:(0,_objectSpread11.default)({},this.state.form,checkedFormFields)},this.handleFormError);}},{key:"getCustomPickerErrorMessage",value:function getCustomPickerErrorMessage(fieldName){var pickerConfig=this.props.formConfig[fieldName];if(!pickerConfig.validationRules){return;}var pickerState=this.state.form[fieldName];var selectedOptions=pickerState.options.filter(function(option){return option.isSelected;});var _pickerConfig$validat=pickerConfig.validationRules.map(function(_ref10){var validationFunction=_ref10.validationFunction,errorMessage=_ref10.errorMessage;var isValid=validationFunction(selectedOptions);return!isValid?errorMessage:undefined;}).filter(Boolean),_pickerConfig$validat2=(0,_slicedToArray2.default)(_pickerConfig$validat,1),errorMessage=_pickerConfig$validat2[0];return errorMessage;}},{key:"getCheckboxErrorMessage",value:function getCheckboxErrorMessage(fieldName){var checkboxConfig=this.props.formConfig[fieldName];if(!checkboxConfig.validationRule){return undefined;}var checkboxValue=this.state.form[fieldName].value;return!checkboxConfig.validationRule.validationFunction(checkboxValue)?checkboxConfig.validationRule.errorMessage:undefined;}},{key:"validateCustomPicker",value:function validateCustomPicker(fieldName){var pickerConfig=this.props.formConfig[fieldName];if(!pickerConfig.validationRules){return true;}var pickerState=this.state.form[fieldName];var selectedOptions=pickerState.options.filter(function(option){return option.isSelected;});return pickerConfig.validationRules.map(function(_ref11){var validationFunction=_ref11.validationFunction;return validationFunction(selectedOptions);}).every(Boolean);}},{key:"validateCheckbox",value:function validateCheckbox(fieldName){var checkboxConfig=this.props.formConfig[fieldName];if(!checkboxConfig.validationRule){return true;}var checkboxValue=this.state.form[fieldName].value;return checkboxConfig.validationRule.validationFunction(checkboxValue);}},{key:"submitForm",value:function submitForm(){var _this3=this;_reactNative.Keyboard.dismiss();if(!this.isFormValid||!this.hasValidCompares){return this.showErrorsOnSubmit();}var form=_utils.R.toPairs(this.state.form).reduce(function(acc,_ref12){var _ref13=(0,_slicedToArray2.default)(_ref12,2),fieldName=_ref13[0],fieldObject=_ref13[1];if(fieldObject.fieldType===_types.FormField.Input){var inputStateProperties=fieldObject;var submitParser=_this3.props.formConfig[fieldName].submitParser;return(0,_objectSpread11.default)({},acc,(0,_defineProperty2.default)({},fieldName,submitParser?submitParser(fieldObject.value):inputStateProperties.value));}if(fieldObject.fieldType===_types.FormField.Checkbox){return(0,_objectSpread11.default)({},acc,(0,_defineProperty2.default)({},fieldName,fieldObject.value));}return(0,_objectSpread11.default)({},acc,(0,_defineProperty2.default)({},fieldName,fieldObject.options.filter(function(option){return option.isSelected;}).map(function(option){return option.value;})));},{});this.props.onFormSubmit(form);}},{key:"validateField",value:function validateField(formFieldName,value){var fieldConfig=this.props.formConfig[formFieldName];if(!fieldConfig.isRequired&&!value){return true;}if(fieldConfig.validationRules){return fieldConfig.validationRules.map(function(_ref14){var validationFunction=_ref14.validationFunction;return validationFunction(value);}).every(Boolean);}return true;}},{key:"getFieldErrorMessage",value:function getFieldErrorMessage(formFieldName,value){var fieldConfig=this.props.formConfig[formFieldName];if(!fieldConfig.isRequired&&!value){return;}if(fieldConfig.validationRules){var _fieldConfig$validati=fieldConfig.validationRules.map(function(_ref15){var validationFunction=_ref15.validationFunction,errorMessage=_ref15.errorMessage;var isValid=validationFunction(value);return!isValid?errorMessage:undefined;}).filter(Boolean),_fieldConfig$validati2=(0,_slicedToArray2.default)(_fieldConfig$validati,1),errorMessage=_fieldConfig$validati2[0];return errorMessage;}return;}},{key:"onTextChange",value:function onTextChange(value,formFieldName){var formField=this.state.form[formFieldName];var shouldLiveCheck=Boolean(formField.hasError)||this.isFormValid;var valueParser=this.props.formConfig[formFieldName].liveParser;var newValue=valueParser?valueParser(value):value;var isValid=shouldLiveCheck?this.validateField(formFieldName,newValue):formField.isValid;var errorMessage=!isValid&&shouldLiveCheck?this.getFieldErrorMessage(formFieldName,newValue):undefined;var isPristine=!(value!==this.props.formConfig[formFieldName].value);this.setState({form:(0,_objectSpread11.default)({},this.state.form,(0,_defineProperty2.default)({},formFieldName,(0,_objectSpread11.default)({},this.state.form[formFieldName],{value:newValue,isValid:isValid,hasError:errorMessage,isPristine:isPristine})))});}},{key:"onInputBlur",value:function onInputBlur(fieldName){var currentValue=this.state.form[fieldName].value.trim();var isValid=this.validateField(fieldName,currentValue);var errorMessage=!isValid?this.getFieldErrorMessage(fieldName,currentValue):undefined;var isPristine=!(currentValue!==this.props.formConfig[fieldName].value);this.setState({form:(0,_objectSpread11.default)({},this.state.form,(0,_defineProperty2.default)({},fieldName,(0,_objectSpread11.default)({},this.state.form[fieldName],{isValid:isValid,hasError:errorMessage,value:currentValue,isPristine:isPristine})))});}},{key:"handlePickerOptionChange",value:function handlePickerOptionChange(fieldName,option){var pickerConfig=this.props.formConfig[fieldName];var isSingleValueMode=pickerConfig.pickerMode===_types.CustomPickerMode.Single;var currentPickerState=this.state.form[fieldName];return this.setState({form:(0,_objectSpread11.default)({},this.state.form,(0,_defineProperty2.default)({},fieldName,(0,_objectSpread11.default)({},currentPickerState,{hasError:undefined,isPristine:false,options:currentPickerState.options.map(function(currentStateOption){if(isSingleValueMode){return currentStateOption.value===option.value?option:(0,_objectSpread11.default)({},currentStateOption,{isSelected:false});}return currentStateOption.value===option.value?option:currentStateOption;})})))});}},{key:"handleCheckboxChange",value:function handleCheckboxChange(fieldName){this.setState({form:(0,_objectSpread11.default)({},this.state.form,(0,_defineProperty2.default)({},fieldName,(0,_objectSpread11.default)({},this.state.form[fieldName],{value:!this.state.form[fieldName].value,isPristine:false,hasError:this.getCheckboxErrorMessage(fieldName)})))});}},{key:"renderChild",value:function renderChild(child){var _this4=this;if(_utils.R.is(String,child)||_utils.R.is(Number,child)||child===null){return child;}var reactElementChild=child;if(reactElementChild.type===_Input.Input){var fieldName=reactElementChild.props.formFieldName;var configProps=this.props.formConfig[fieldName];var inputProps=reactElementChild.props.inputProps;var customInputStyles=inputProps&&inputProps.style?inputProps.style:{};var formConfigStyles=configProps.inputProps&&configProps.inputProps.style?configProps.inputProps.style:{};return _react.default.cloneElement(reactElementChild,(0,_objectSpread11.default)({},reactElementChild.props,{withError:this.state.form[fieldName].hasError,inputProps:(0,_objectSpread11.default)({editable:!Boolean(this.props.isLoading)},configProps.inputProps,{style:_reactNative.StyleSheet.flatten([formConfigStyles,customInputStyles]),value:this.state.form[fieldName].value,onChangeText:function onChangeText(value){return _this4.onTextChange(value,fieldName);},onBlur:function onBlur(){return _this4.onInputBlur(fieldName);}})}));}if(reactElementChild.type===_CustomPicker.CustomPicker){var _fieldName=reactElementChild.props.formFieldName;var pickerState=this.state.form[_fieldName];return _react.default.cloneElement(reactElementChild,(0,_objectSpread11.default)({},reactElementChild.props,{withError:this.state.form[_fieldName].hasError,options:pickerState.options,onOptionChange:function onOptionChange(option){return _this4.handlePickerOptionChange(_fieldName,option);}}));}if(reactElementChild.type===_Checkbox.Checkbox){var _fieldName2=reactElementChild.props.formFieldName;return _react.default.cloneElement(reactElementChild,(0,_objectSpread11.default)({},reactElementChild.props,{withError:this.state.form[_fieldName2].hasError,isSelected:this.state.form[_fieldName2].value,onChange:function onChange(){return _this4.handleCheckboxChange(_fieldName2);}}));}var reactElementChildren=reactElementChild.props.children;if(reactElementChildren){var newChildren=_react.default.Children.map(reactElementChildren,this.renderChild);return _react.default.cloneElement(reactElementChild,reactElementChild.props,newChildren);}return reactElementChild;}},{key:"renderForm",value:function renderForm(){var children=this.props.children;if(!children){throw new Error('children are mandatory');}return _react.default.Children.map(this.props.children,this.renderChild);}},{key:"renderScrollableForm",value:function renderScrollableForm(){return _react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:495}},_react.default.createElement(_reactNative.View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:496}},_react.default.createElement(_reactNative.ScrollView,{style:(0,_objectSpread11.default)({},styles.container,this.props.customFormContainerStyles),keyboardShouldPersistTaps:"never",__source:{fileName:_jsxFileName,lineNumber:497}},this.renderForm())));}},{key:"renderRegularForm",value:function renderRegularForm(){return _react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:513}},_react.default.createElement(_reactNative.View,{style:(0,_objectSpread11.default)({},styles.container,this.props.customFormContainerStyles),__source:{fileName:_jsxFileName,lineNumber:514}},this.renderForm()));}},{key:"render",value:function render(){return this.props.isScrollable?this.renderScrollableForm():this.renderRegularForm();}},{key:"isFormValid",get:function get(){var _this5=this;var areInputsValid=_utils.R.toPairs(this.state.form).filter(function(_ref16){var _ref17=(0,_slicedToArray2.default)(_ref16,2),fieldObject=_ref17[1];return fieldObject.fieldType===_types.FormField.Input;}).map(function(_ref18){var _ref19=(0,_slicedToArray2.default)(_ref18,2),fieldName=_ref19[0],fieldObject=_ref19[1];return _this5.validateField(fieldName,fieldObject.value);}).every(Boolean);var areCustomPickersValid=_utils.R.toPairs(this.state.form).filter(function(_ref20){var _ref21=(0,_slicedToArray2.default)(_ref20,2),fieldObject=_ref21[1];return fieldObject.fieldType===_types.FormField.CustomPicker;}).map(function(_ref22){var _ref23=(0,_slicedToArray2.default)(_ref22,1),fieldName=_ref23[0];return _this5.validateCustomPicker(fieldName);}).every(Boolean);var areCheckboxesValid=_utils.R.toPairs(this.state.form).filter(function(_ref24){var _ref25=(0,_slicedToArray2.default)(_ref24,2),fieldObject=_ref25[1];return fieldObject.fieldType===_types.FormField.Checkbox&&fieldObject.isRequired;}).map(function(_ref26){var _ref27=(0,_slicedToArray2.default)(_ref26,1),fieldName=_ref27[0];return _this5.validateCheckbox(fieldName);}).every(Boolean);return _utils.R.all(areInputsValid,areCustomPickersValid,areCheckboxesValid,!this.props.isLoading);}},{key:"hasValidCompares",get:function get(){var _this6=this;var inputsToCompare=_utils.R.toPairs(this.state.form).filter(function(_ref28){var _ref29=(0,_slicedToArray2.default)(_ref28,2),fieldName=_ref29[0],fieldObject=_ref29[1];return fieldObject.fieldType===_types.FormField.Input&&Boolean(_this6.props.formConfig[fieldName].compareWith);});return inputsToCompare.length?inputsToCompare.map(function(_ref30){var _ref31=(0,_slicedToArray2.default)(_ref30,2),fieldName=_ref31[0],fieldObject=_ref31[1];var fieldToCompare=_this6.props.formConfig[fieldName].compareWith.fieldName;return fieldObject.value===_this6.state.form[fieldToCompare].value;}).every(Boolean):true;}}]);return Form;}(_react.default.Component);exports.Form=Form;(0,_defineProperty2.default)(Form,"defaultProps",{customFormContainerStyles:{}});var styles={container:{width:'100%'}};