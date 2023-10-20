import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Search from '../../screens/Search/Search';
import SettingsScreen from '../../screens/Settings/SettingsScreen';
import Myorders from '../../screens/Settings/Myorders';
import Shippingaddresses from '../../screens/Settings/Shippingaddresses';
import SettingsProfile from '../../screens/Settings/SettingsProfile';

const Stack = createStackNavigator();

const SettingStack = () => {
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
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{title: 'SettingsScreen'}}
      />
      <Stack.Screen name="Myorders" component={Myorders} />
      <Stack.Screen name="Shippingaddresses" component={Shippingaddresses} />
      <Stack.Screen name="SettingsProfile" component={SettingsProfile} />
    </Stack.Navigator>
  );
};
export default SettingStack;
