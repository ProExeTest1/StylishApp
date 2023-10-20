import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '../../screens/auth/Login';
import CreateAccount from '../../screens/auth/CreateAccount';
import ForgetPass from '../../screens/auth/ForgetPass';
import PhoneSignUp from '../../screens/auth/PhoneSignUp';
import MyTabs from '../TabNavigator';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="PhoneSignUp" component={PhoneSignUp} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
};
export default AuthStack;
