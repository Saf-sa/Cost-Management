# Cost-Management


 init repo Client

1- npm init -y

first instal Xcode IOS globaly
2- npx create-expo-app App 



3- - cd App
npm install 



- npm run android (need solution for Android not allow by Apple)
- npm run ios (first instal Xcode)
- npm run web (for the web App install : 
 npx expo install react-native-web)

 command Expo Go

 › Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor

› Press ? │ show all commands

› Open in the web browser...
› Press ? │ show all commands

4- install react native vector icons for show/hide password :

npm i react-native-vector-icons

- npm run web (for the web App install :  npx expo install react-native-web)

4- Install React Navigation :
npm install @react-navigation/native
& Add top of the page
import { Navigation } from "react-native-navigation";
5- Install dependencies into an Expo managed project:
npx expo install react-native-screens react-native-safe-area-context

5- https://reactnavigation.org/docs/stack-navigator

Install React Native Navigator (standalone library that enables you to implement navigation functionality in a React Native application.)



install react-navigation/stack
npm install @react-navigation/stack (provides a way for your app to transition between screens where each new screen is placed on top of a stack.)

6- Install React Native Navigation (standalone library that enables you to implement navigation functionality in a React Native application.)

If you have a Expo managed project, in your project directory, run:
npx expo install @react-native-masked-view/masked-view

7- If you have a Expo managed project, in your project directory, run:
npx expo install react-native-gesture-handler

If you're on a Mac and developing for iOS, you also need to install the pods (via Cocoapods) to complete the linking.

npx pod-install ios

8- install react native drawer ( a navigation pattern that allows you to create a side menu that slides in and out from the left or right side of the screen)
npm install @react-navigation/drawer


9- install react native animated (designed to make animations fluid, powerful, and painless to build and maintain.)
npm i react-native-reanimated

10- install dotenv for react-native different for REact to be able to communicate with server

npm install react-native-dotenv

11- add .env url for react native 

API_URL=http: http://localhost:5555 (my localhost)

12- setup files .babelrc or babel.config.js to add this plugin to my files :

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv']
  ],
};

13- imstall react-native-async-storage/async-storage (an unencrypted, asynchronous, persistent, key-value storage system that is global to the app.)

npm install @react-native-async-storage/async-storage

how to reset the cache in react native :

npm start -- --reset-cache

14- install font-awesome-icons

npm i font-awesome-icons ( font that exclusively contains icon glyphs rather than alphanumeric glyphs.)

15 - Install react-navigation/bottom-tabs (A material-design themed tab bar on the bottom of the screen that lets you switch between different routes.)

npm i @react-navigation/bottom-tabs

16-  install expo-linear-gradient (universal React component that renders a gradient view.)

npx expo install expo-linear-gradient

17-  expo-modules-core

 npm install expo-modules-core (
Expo Modules allow you to write native code in a way that feels natural with minimal boilerplate that is also consistent on both platforms.)

 18- innstall moment (date library for parsing, validating, manipulating, and formatting dates)

 npm i moment

 19- install formik (https://formik.org/docs/guides/react-native)
(useFormik() is a custom React hook that will return all Formik state and helpers directly.)

npm install formik --save

20- datetimepicker (ross platform react native date picker component for android and ios. It includes 3 different modes: date, time, and datetime. )
https://github.com/react-native-datetimepicker/datetimepicker

npm install @react-native-community/datetimepicker --save

20-install react-native-keyboard-aware-scroll-view (Implementing KeyboardAwareScrollView in React Native
npm i react-native-keyboard-aware-scroll-view
By using KeyboardAwareScrollView , your entire screen becomes scrollable. Furthermore, it automatically handles input field focus and lifts the field upward upon opening the keyboard.)

21- instll React Native (Paper is the cross-platform UI kit library containing a collection of customizable and production-ready components, which by default are following and respecting the Google's Material Design guidelines.)

npm i react-native-paper