var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.ErrorMessage=void 0;var _objectSpread2=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _common=require("../lib/common");var _jsxFileName="/Users/krystianpach/Documents/Projekty/react-native-form-builder/src/components/ErrorMessage.tsx";var ErrorMessage=function ErrorMessage(_ref){var text=_ref.text,style=_ref.style;return text?_react.default.createElement(_reactNative.Text,{style:(0,_objectSpread2.default)({},styles.errorMessage,style),__source:{fileName:_jsxFileName,lineNumber:8}},text):null;};exports.ErrorMessage=ErrorMessage;ErrorMessage.defaultProps={style:{}};var styles={errorMessage:{paddingHorizontal:2,color:_common.colors.red,fontSize:11,paddingTop:5}};