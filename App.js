import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SignupScreen from './src/screen/SignupScreen'
import SigninScreen from './src/screen/SiginScreen'
import ForgetPassword from './src/screen/ForgetPassword'
import HomePage from './src/screen/HomePage'
import ProfilePage from './src/screen/ProfilePage'
import { Provider as AuthProvider } from './src/context/AuthContext'
import SetNewPass from './src/screen/SetNewPass'
import {setNavigator} from './src/navigationRef'


const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
    Forget: ForgetPassword,
    NewPass: SetNewPass,

  }),
  mainFlow: createBottomTabNavigator({
    //   trackListFlow: createStackNavigator({

    //   }),

    Home: HomePage,
    Profile: ProfilePage,
  }),

});

// export default createAppContainer(switchNavigator);
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => {setNavigator(navigator)} } />
    </AuthProvider>
  );
};