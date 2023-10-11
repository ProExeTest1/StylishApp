import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Preview from '../screens/Preview/Preview';
import Login from '../screens/auth/Login';
import CreateAccount from '../screens/auth/CreateAccount';
import ForgetPass from '../screens/auth/ForgetPass';
import Home from '../screens/Home/Home';
import PhoneSignUp from '../screens/auth/PhoneSignUp';
import MyTabs from './TabNavigator';
import AuthStack from './Stacks/AuthStack';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const [isUserLogin, setUserLogin] = useState(true);
  //global.isUserLogin=true
  auth().onAuthStateChanged(user => {
    console.log('state of user', user);
    if (user) {
      setUserLogin(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserLogin ? 'Preview' : 'MyTabs'}
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen
          name="Preview"
          component={Preview}
          options={{title: 'Preview'}}
        />
        <Stack.Screen name="MyTabs" component={MyTabs} /> */}
        {/* {isUserLogin ? (
          <Stack.Screen
            name="Preview"
            component={Preview}
            options={{title: 'Preview'}}
          />
        ) : (
          <Stack.Screen name="MyTabs" component={MyTabs} />
        )} */}
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={{title: 'Preview'}}
        />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
