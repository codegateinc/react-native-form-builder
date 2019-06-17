module.exports = {
    "presets": [
        "module:metro-react-native-babel-preset",
    ],
    "plugins": [
        ["module-resolver", {
            "root": ["./src"],
            "extensions": [".ts", ".tsx"]
        }],
        "@babel/plugin-transform-runtime",
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ],
    "env": {
        "production": {
            "plugins": ["transform-remove-console"]
        },
    }
}