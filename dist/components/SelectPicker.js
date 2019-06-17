var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.SelectPicker=void 0;var _objectSpread2=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _types=require("../lib/types");var _common=require("../lib/common");var _utils=require("../lib/utils");var _Label=require("./Label");var _jsxFileName="/Users/krystianpach/Documents/Projekty/react-native-form-builder/src/components/SelectPicker.tsx";var arrowDown=0;var SelectPicker=function(_React$Component){(0,_inherits2.default)(SelectPicker,_React$Component);function SelectPicker(props){var _this;(0,_classCallCheck2.default)(this,SelectPicker);_this=(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(SelectPicker).call(this,props));var _ref=_this.props.pickerOptions,_ref2=(0,_slicedToArray2.default)(_ref,1),firstOption=_ref2[0];var selectedOption=_utils.R.isDefined(_this.props.selectedOption)?_this.props.selectedOption:firstOption?firstOption.value:undefined;_this.state={isModalVisible:false,selectedOption:selectedOption};_this.confirmSelection=_this.confirmSelection.bind((0,_assertThisInitialized2.default)(_this));return _this;}(0,_createClass2.default)(SelectPicker,[{key:"toggleModalVisibility",value:function toggleModalVisibility(isModalVisible){this.setState({isModalVisible:isModalVisible,selectedOption:!isModalVisible?this.props.selectedOption:this.state.selectedOption});}},{key:"confirmSelection",value:function confirmSelection(){if(this.props.onSuccess){this.props.onSuccess(this.state.selectedOption);}this.setState({isModalVisible:false});}},{key:"getLabelForSelectedOption",value:function getLabelForSelectedOption(selectedOption){if(!_utils.R.isDefined(selectedOption)){return undefined;}var option=this.props.pickerOptions.find(function(option){return option.value===selectedOption;});return option?option.label:undefined;}},{key:"renderSelectedOptionPreview",value:function renderSelectedOptionPreview(){var selectedOptionLabel=this.getLabelForSelectedOption(this.props.selectedOption);var previewText=selectedOptionLabel?selectedOptionLabel:this.props.placeholder||'';return _react.default.createElement(_reactNative.View,{style:styles.previewContainer,__source:{fileName:_jsxFileName,lineNumber:78}},_react.default.createElement(_reactNative.Text,{style:(0,_objectSpread2.default)({},styles.previewText,selectedOptionLabel?styles.selectedText:{}),__source:{fileName:_jsxFileName,lineNumber:79}},previewText),_react.default.createElement(_reactNative.Image,{source:arrowDown,style:styles.arrowDown,__source:{fileName:_jsxFileName,lineNumber:87}}));}},{key:"renderPickerHeader",value:function renderPickerHeader(){var _this2=this;return _react.default.createElement(_reactNative.View,{style:styles.pickerHeaderContainer,__source:{fileName:_jsxFileName,lineNumber:99}},_react.default.createElement(_reactNative.Text,{style:styles.actionButton,onPress:function onPress(){return _this2.toggleModalVisibility(false);},__source:{fileName:_jsxFileName,lineNumber:100}},'Cancel'),_react.default.createElement(_reactNative.Text,{style:styles.pickerTitle,__source:{fileName:_jsxFileName,lineNumber:106}},this.props.pickerTitle),_react.default.createElement(_reactNative.Text,{style:styles.actionButton,onPress:this.confirmSelection,__source:{fileName:_jsxFileName,lineNumber:109}},'Done'));}},{key:"renderPickerOption",value:function renderPickerOption(option){return _react.default.createElement(_reactNative.Picker.Item,{key:option.value,value:option.value,label:option.label,__source:{fileName:_jsxFileName,lineNumber:121}});}},{key:"renderPicker",value:function renderPicker(){var _this3=this;return this.props.pickerOptions?_react.default.createElement(_reactNative.View,{style:styles.pickerContainer,__source:{fileName:_jsxFileName,lineNumber:131}},this.renderPickerHeader(),_react.default.createElement(_reactNative.Picker,{selectedValue:this.state.selectedOption,onValueChange:function onValueChange(option){return _this3.setState({selectedOption:option});},__source:{fileName:_jsxFileName,lineNumber:133}},this.props.pickerOptions.map(this.renderPickerOption))):null;}},{key:"renderPickerOptions",value:function renderPickerOptions(){var _this4=this;return _react.default.createElement(_reactNative.Modal,{transparent:true,visible:this.state.isModalVisible,animationType:_types.ModalAnimation.Fade,__source:{fileName:_jsxFileName,lineNumber:147}},_react.default.createElement(_reactNative.View,{style:styles.modalBody,__source:{fileName:_jsxFileName,lineNumber:152}},_react.default.createElement(_reactNative.TouchableOpacity,{style:styles.backdropButton,onPress:function onPress(){return _this4.toggleModalVisibility(false);},__source:{fileName:_jsxFileName,lineNumber:153}}),this.renderPicker()));}},{key:"renderErrorMessage",value:function renderErrorMessage(){return this.props.hasError?_react.default.createElement(_reactNative.Text,{style:styles.errorMessage,__source:{fileName:_jsxFileName,lineNumber:165}},this.props.hasError):null;}},{key:"renderLabel",value:function renderLabel(){return this.props.withLabel?_react.default.createElement(_Label.Label,{text:this.props.withLabel,__source:{fileName:_jsxFileName,lineNumber:173}}):null;}},{key:"render",value:function render(){var _this5=this;return _react.default.createElement(_reactNative.View,{style:(0,_objectSpread2.default)({},styles.container,this.props.customContainerStyles),__source:{fileName:_jsxFileName,lineNumber:179}},this.renderLabel(),_react.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:1,style:styles.fakeSelect,onPress:!this.props.isDisabled?function(){return _this5.toggleModalVisibility(true);}:undefined,__source:{fileName:_jsxFileName,lineNumber:186}},this.renderSelectedOptionPreview()),this.renderErrorMessage(),this.renderPickerOptions());}}]);return SelectPicker;}(_react.default.Component);exports.SelectPicker=SelectPicker;SelectPicker.defaultProps={pickerTitle:'',pickerOptions:[],customContainerStyles:{}};var styles={container:{width:'100%'},fakeSelect:{width:'100%',height:36,borderRadius:4,backgroundColor:_common.colors.lightPrimary,paddingHorizontal:15,paddingVertical:7,fontSize:17,color:_common.colors.midnightBlue,justifyContent:'center'},previewContainer:{flex:1,flexDirection:'row',justifyContent:'space-between'},previewText:{fontSize:17,color:_common.colors.gray},selectedText:{color:_common.colors.midnightBlue},arrowDown:{width:8,height:4,marginTop:9},modalBody:{flex:1,justifyContent:'flex-end',backgroundColor:_common.colors.customBlackTransparent(0.45)},backdropButton:{flex:1},pickerContainer:{flex:1,maxHeight:263,backgroundColor:_common.colors.white},pickerHeaderContainer:{paddingVertical:18,paddingHorizontal:16,flexDirection:'row',justifyContent:'space-between'},pickerTitle:{fontSize:14,color:_common.colors.midnightBlue,fontWeight:'600'},actionButton:{color:_common.colors.red,fontSize:17,fontWeight:'500'},errorMessage:{paddingHorizontal:2,color:_common.colors.red,fontSize:11,paddingTop:5}};