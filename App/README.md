# Cost-Management


 init repo Client

1- npm init -y

first instal Xcode IOS globaly
2- npx create-expo-app App 

3- - cd App
- npm run android (need solution for Android not allow by Apple)
- npm run ios (first instal Xcode)
- npm run web (for the web App install : 
 npx expo install react-native-web)

4- install react native vector icons for show/hide password :

npm i react-native-vector-icons

- npm run web (for the web App install :  npx expo install react-native-web)
4- Install React Navigation :
npm install @react-navigation/native
& Add top of the page
import { Navigation } from "react-native-navigation";
5- Install dependencies into an Expo managed project:
npx expo install react-native-screens react-native-safe-area-context
5- Install React Native Navigator
https://reactnavigation.org/docs/stack-navigator
npm install @react-navigation/stack
6- Install React Native Navigation 
7- If you have a Expo managed project, in your project directory, run:
npx expo install react-native-gesture-handler

8- install react native drawer
npm install @react-navigation/drawer


9- install react native animated
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

how to reset the cache in react native :

npm start -- --reset-cache