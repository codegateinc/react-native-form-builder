var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.Form=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _objectSpread8=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _utils=require("../lib/utils");var _utils2=require("../utils");var _types=require("../types");var _Input=require("./Input");var _jsxFileName="/Users/krystianpach/Documents/Projekty/react-native-form-builder/src/components/Form.tsx";var Form=function(_React$Component){(0,_inherits2.default)(Form,_React$Component);function Form(props){var _this;(0,_classCallCheck2.default)(this,Form);_this=(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(Form).call(this,props));_this.state={form:(0,_utils2.prepareFormInitialState)(_this.props.formConfig)};_this.submitForm=_this.submitForm.bind((0,_assertThisInitialized2.default)(_this));_this.renderChild=_this.renderChild.bind((0,_assertThisInitialized2.default)(_this));return _this;}(0,_createClass2.default)(Form,[{key:"setCustomFieldError",value:function setCustomFieldError(fieldName,errorMessage){this.setState({form:(0,_objectSpread8.default)({},this.state.form,(0,_defineProperty2.default)({},fieldName,(0,_objectSpread8.default)({},this.state.form[fieldName],{hasError:errorMessage,isValid:false})))});}},{key:"showErrorsOnSubmit",value:function showErrorsOnSubmit(){var _this2=this;var checkedFormFields=_utils.R.toPairs(this.state.form).filter(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),fieldObject=_ref2[1];return fieldObject.isRequired;}).map(function(_ref3){var _ref4=(0,_slicedToArray2.default)(_ref3,2),fieldName=_ref4[0],fieldObject=_ref4[1];var isValid=_this2.validateField(fieldName,fieldObject.value);var hasError=!isValid?_this2.getFieldErrorMessage(fieldName,fieldObject.value):undefined;return[fieldName,(0,_objectSpread8.default)({},fieldObject,{isValid:isValid,hasError:hasError})];}).reduce(function(acc,_ref5){var _ref6=(0,_slicedToArray2.default)(_ref5,2),fieldName=_ref6[0],fieldObject=_ref6[1];return(0,_objectSpread8.default)({},acc,(0,_defineProperty2.default)({},fieldName,fieldObject));},{});this.setState({form:(0,_objectSpread8.default)({},this.state.form,checkedFormFields)});}},{key:"submitForm",value:function submitForm(){var _this3=this;_reactNative.Keyboard.dismiss();if(!this.isFormValid){return this.showErrorsOnSubmit();}var form=_utils.R.toPairs(this.state.form).reduce(function(acc,_ref7){var _ref8=(0,_slicedToArray2.default)(_ref7,2),fieldName=_ref8[0],fieldObject=_ref8[1];var isInput=fieldObject.fieldType===_types.FormField.Input;if(isInput){var submitParser=_this3.props.formConfig[fieldName].submitParser;return(0,_objectSpread8.default)({},acc,(0,_defineProperty2.default)({},fieldName,submitParser?submitParser(fieldObject.value):fieldObject.value));}return(0,_objectSpread8.default)({},acc,(0,_defineProperty2.default)({},fieldName,fieldObject.value));},{});this.props.onFormSubmit(form);}},{key:"validateField",value:function validateField(formFieldName,value){var fieldConfig=this.props.formConfig[formFieldName];if(!fieldConfig.isRequired&&!value){return true;}if(fieldConfig.validationRules){return fieldConfig.validationRules.map(function(_ref9){var validationFunction=_ref9.validationFunction;return validationFunction(value);}).every(Boolean);}return true;}},{key:"getFieldErrorMessage",value:function getFieldErrorMessage(formFieldName,value){var fieldConfig=this.props.formConfig[formFieldName];if(!fieldConfig.isRequired&&!value){return;}if(fieldConfig.validationRules){var _fieldConfig$validati=fieldConfig.validationRules.map(function(_ref10){var validationFunction=_ref10.validationFunction,errorMessage=_ref10.errorMessage;var isValid=validationFunction(value);return!isValid?errorMessage:undefined;}).filter(Boolean),_fieldConfig$validati2=(0,_slicedToArray2.default)(_fieldConfig$validati,1),errorMessage=_fieldConfig$validati2[0];return errorMessage;}return;}},{key:"onTextChange",value:function onTextChange(value,formFieldName){var formField=this.state.form[formFieldName];var shouldLiveCheck=Boolean(formField.hasError)||this.isFormValid;var valueParser=this.props.formConfig[formFieldName].liveParser;var newValue=valueParser?valueParser(value):value;var isValid=shouldLiveCheck?this.validateField(formFieldName,newValue):formField.isValid;var errorMessage=!isValid&&shouldLiveCheck?this.getFieldErrorMessage(formFieldName,newValue):undefined;this.setState({form:(0,_objectSpread8.default)({},this.state.form,(0,_defineProperty2.default)({},formFieldName,(0,_objectSpread8.default)({},this.state.form[formFieldName],{value:newValue,isValid:isValid,hasError:errorMessage})))});}},{key:"onInputBlur",value:function onInputBlur(fieldName){var currentValue=this.state.form[fieldName].value.trim();var isValid=this.validateField(fieldName,currentValue);var errorMessage=!isValid?this.getFieldErrorMessage(fieldName,currentValue):undefined;this.setState({form:(0,_objectSpread8.default)({},this.state.form,(0,_defineProperty2.default)({},fieldName,(0,_objectSpread8.default)({},this.state.form[fieldName],{isValid:isValid,hasError:errorMessage,value:currentValue})))});}},{key:"renderChild",value:function renderChild(child){var _this4=this;if(_utils.R.is(String,child)||_utils.R.is(Number,child)){return child;}var reactElementChild=child;if(reactElementChild.type===_Input.Input){var fieldName=reactElementChild.props.formFieldName;var configProps=this.props.formConfig[fieldName];return _react.default.cloneElement(reactElementChild,(0,_objectSpread8.default)({},reactElementChild.props,{withError:this.state.form[fieldName].hasError,inputProps:(0,_objectSpread8.default)({editable:!Boolean(this.props.isLoading)},configProps.inputProps,{value:this.state.form[fieldName].value,onChangeText:function onChangeText(value){return _this4.onTextChange(value,fieldName);},onBlur:function onBlur(){return _this4.onInputBlur(fieldName);}})}));}var reactElementChildren=reactElementChild.props.children;if(reactElementChildren){var newChildren=_react.default.Children.map(reactElementChildren,this.renderChild);return _react.default.cloneElement(reactElementChild,reactElementChild.props,newChildren);}return reactElementChild;}},{key:"renderForm",value:function renderForm(){var children=this.props.children;if(!children){throw new Error('children are mandatory');}return _react.default.Children.map(this.props.children,this.renderChild);}},{key:"renderScrollableForm",value:function renderScrollableForm(){return _react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:248}},_react.default.createElement(_reactNative.View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:249}},_react.default.createElement(_reactNative.ScrollView,{style:(0,_objectSpread8.default)({},styles.container,this.props.customFormContainerStyles),keyboardShouldPersistTaps:"never",__source:{fileName:_jsxFileName,lineNumber:250}},this.renderForm())));}},{key:"renderRegularForm",value:function renderRegularForm(){return _react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:266}},_react.default.createElement(_reactNative.View,{style:(0,_objectSpread8.default)({},styles.container,this.props.customFormContainerStyles),__source:{fileName:_jsxFileName,lineNumber:267}},this.renderForm()));}},{key:"render",value:function render(){return this.props.isScrollable?this.renderScrollableForm():this.renderRegularForm();}},{key:"isFormValid",get:function get(){var _this5=this;var areInputsValid=_utils.R.toPairs(this.state.form).filter(function(_ref11){var _ref12=(0,_slicedToArray2.default)(_ref11,2),fieldObject=_ref12[1];return fieldObject.fieldType===_types.FormField.Input;}).map(function(_ref13){var _ref14=(0,_slicedToArray2.default)(_ref13,2),fieldName=_ref14[0],fieldObject=_ref14[1];return _this5.validateField(fieldName,fieldObject.value);}).every(Boolean);return _utils.R.all(areInputsValid,!this.props.isLoading);}}]);return Form;}(_react.default.Component);exports.Form=Form;(0,_defineProperty2.default)(Form,"defaultProps",{customFormContainerStyles:{}});var styles={container:{flex:1}};