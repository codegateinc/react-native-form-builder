var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.prepareFormInitialState=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _utils=require("./lib/utils");var prepareFormInitialState=function prepareFormInitialState(formConfig){var preparedPairs=_utils.R.toPairs(formConfig).map(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),fieldName=_ref2[0],config=_ref2[1];var isValidInputValue=_utils.R.is(String,config.value)||_utils.R.is(Number,config.value);return[fieldName,{isValid:Boolean(config.value),isRequired:config.isRequired,value:isValidInputValue?config.value:'',fieldType:config.fieldType}];});return _utils.R.fromPairs(preparedPairs);};exports.prepareFormInitialState=prepareFormInitialState;