var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.Checkbox=void 0;var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _ErrorMessage=require("./ErrorMessage");var _jsxFileName="/Users/krystianpach/Documents/react-native-form-builder/src/components/Checkbox.tsx";var renderErrorText=function renderErrorText(withError,errorMessageStyles){return _react.default.createElement(_ErrorMessage.ErrorMessage,{text:withError,style:errorMessageStyles,__source:{fileName:_jsxFileName,lineNumber:7}});};var Checkbox=function Checkbox(_ref){var renderComponent=_ref.renderComponent,isSelected=_ref.isSelected,withError=_ref.withError,errorMessageStyles=_ref.errorMessageStyles,onChange=_ref.onChange;return renderComponent?_react.default.createElement(_reactNative.TouchableWithoutFeedback,{onPress:onChange,__source:{fileName:_jsxFileName,lineNumber:20}},_react.default.createElement(_react.Fragment,{__source:{fileName:_jsxFileName,lineNumber:21}},renderComponent(Boolean(isSelected)),renderErrorText(withError,errorMessageStyles))):null;};exports.Checkbox=Checkbox;Checkbox.defaultProps={errorMessageStyles:{}};