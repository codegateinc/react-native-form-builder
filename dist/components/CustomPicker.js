var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.CustomPicker=void 0;var _objectSpread2=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireWildcard(require("react"));var _ErrorMessage=require("./ErrorMessage");var _jsxFileName="/Users/krystianpach/Documents/Projekty/react-native-form-builder/src/components/CustomPicker.tsx";var CustomPicker=function(_React$Component){(0,_inherits2.default)(CustomPicker,_React$Component);function CustomPicker(props){var _this;(0,_classCallCheck2.default)(this,CustomPicker);_this=(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(CustomPicker).call(this,props));(0,_defineProperty2.default)((0,_assertThisInitialized2.default)(_this),"state",{isPickerVisible:Boolean(_this.props.isPickerAlwaysVisible)});_this.onOptionPress=_this.onOptionPress.bind((0,_assertThisInitialized2.default)(_this));_this.setPickerVisibility=_this.setPickerVisibility.bind((0,_assertThisInitialized2.default)(_this));return _this;}(0,_createClass2.default)(CustomPicker,[{key:"setPickerVisibility",value:function setPickerVisibility(isVisible){if(Boolean(this.props.isPickerAlwaysVisible)){return;}this.setState({isPickerVisible:isVisible});}},{key:"onOptionPress",value:function onOptionPress(option){if(this.props.onOptionChange){this.props.onOptionChange((0,_objectSpread2.default)({},option,{isSelected:!Boolean(option.isSelected)}));}}},{key:"renderPlaceholderComponent",value:function renderPlaceholderComponent(){if(!this.props.renderPlaceholderComponent||!this.props.options){return null;}var selectedOptions=this.props.options.filter(function(option){return Boolean(option.isSelected);});return _react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:44}},this.props.renderPlaceholderComponent(selectedOptions,this.state.isPickerVisible,this.setPickerVisibility));}},{key:"renderPickerComponent",value:function renderPickerComponent(){if(!this.props.options){throw new Error('options are mandatory');}return this.state.isPickerVisible?_react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:56}},this.props.renderPickerComponent(this.props.options,this.onOptionPress,this.setPickerVisibility)):null;}},{key:"renderError",value:function renderError(){return _react.default.createElement(_ErrorMessage.ErrorMessage,{text:this.props.withError,style:this.props.customErrorStyle,__source:{fileName:_jsxFileName,lineNumber:64}});}},{key:"render",value:function render(){return _react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:73}},this.renderPlaceholderComponent(),this.renderPickerComponent(),this.renderError());}}]);return CustomPicker;}(_react.default.Component);exports.CustomPicker=CustomPicker;