import React from 'react';
import {View, Text} from 'react-native';
import Home from '../../screens/Home/Home';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Checkout from '../../screens/Cart/Checkout';

const Stack = createStackNavigator();

const ShoppingCartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Checkout"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#101010',
        },
        animationEnabled: false,
        gestureEnabled: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#ffd700',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{title: 'Checkout'}}
      />
    </Stack.Navigator>
  );
};
export default ShoppingCartStack;
