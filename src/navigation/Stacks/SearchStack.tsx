import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Search from '../../screens/Search/Search';
import SettingsScreen from '../../screens/Settings/SettingsScreen';

const Stack = createStackNavigator();

const SearchStack = () => {
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
        name="Search"
        component={Search}
        options={{title: 'Search'}}
      />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
export default SearchStack;
