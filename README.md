
# react-native-react-native-form-builder

## Getting started

`$ npm install react-native-react-native-form-builder --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-form-builder`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-form-builder` and add `RNReactNativeFormBuilder.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeFormBuilder.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeFormBuilderPackage;` to the imports at the top of the file
  - Add `new RNReactNativeFormBuilderPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-form-builder'
  	project(':react-native-react-native-form-builder').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-form-builder/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-form-builder')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNReactNativeFormBuilder.sln` in `node_modules/react-native-react-native-form-builder/windows/RNReactNativeFormBuilder.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using React.Native.Form.Builder.RNReactNativeFormBuilder;` to the usings at the top of the file
  - Add `new RNReactNativeFormBuilderPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNReactNativeFormBuilder from 'react-native-react-native-form-builder';

// TODO: What to do with the module?
RNReactNativeFormBuilder;
```
  