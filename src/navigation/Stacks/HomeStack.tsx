import React from 'react';
import {View, Text} from 'react-native';
import Home from '../../screens/Home/Home';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Products from '../../screens/Home/ProductsScreen';
import ProductsScreen from '../../screens/Home/ProductsScreen';
import ProductDetails from '../../screens/Home/ProductDetails';
import Checkout from '../../screens/Cart/Checkout';
import ShoppingBag from '../../screens/Cart/ShoppingBag';
import SettingsScreen from '../../screens/Settings/SettingsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ShoppingBag" component={ShoppingBag} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
export default HomeStack;
