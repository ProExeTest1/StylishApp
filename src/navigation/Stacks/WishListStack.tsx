import React from 'react';
import {View, Text} from 'react-native';
import Home from '../../screens/Home/Home';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Wishlist from '../../screens/Wishlist/Wishlist';
import ProductDetails from '../../screens/Home/ProductDetails';
import Checkout from '../../screens/Cart/Checkout';
import SettingsScreen from '../../screens/Settings/SettingsScreen';

const Stack = createStackNavigator();

const WishListStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Wishlist"
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
        name="Wishlist"
        component={Wishlist}
        options={{title: 'Wishlist'}}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
export default WishListStack;
