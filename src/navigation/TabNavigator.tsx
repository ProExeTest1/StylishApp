import React from 'react';
import {Image, Pressable, StyleSheet, View, Platform, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './Stacks/HomeStack';
import WishListStack from './Stacks/WishListStack';
import ShoppingCartStack from './Stacks/ShoppingCartStack';
import SearchStack from './Stacks/SearchStack';
import SettingStack from './Stacks/SettingStack';
import {Colors} from '../helpers/colors';
import {Images} from '../helpers/images';

import HomeIcon from '../assets/SVGs/HomeIcons/HomeIcon.svg';
import HomeIconBlack from '../assets/SVGs/HomeIcons/HomeIconBlack.svg';

import HeartIcon from '../assets/SVGs/WishlistIcons/HeartIcon.svg';
import HeartIconBlack from '../assets/SVGs/WishlistIcons/HeartIconBlack.svg';

import ShoppingKartIcon from '../assets/SVGs/ShoppingkartIcons/ShoppingKartIcon.svg';
import ShoppingKartIconBlack from '../assets/SVGs/ShoppingkartIcons/ShoppingKartIconBlack.svg';

import SearchIcon from '../assets/SVGs/SearchIcons/SearchIcon.svg';
import SearchIconBlack from '../assets/SVGs/SearchIcons/SearchIconBlack.svg';

import SettingsIcon from '../assets/SVGs/SettingIcons/SettingsIcon.svg';
import SettingsIconBlack from '../assets/SVGs/SettingIcons/SettingsIconBlack.svg';

import {hp, wp} from '../helpers/ResponsiveFonts';

const Tab = createBottomTabNavigator();

const MyTabs: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route: {name}}) => ({
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        // tabBarActiveTintColor: Colors.Primary,
        tabBarInactiveTintColor: 'lightgray',
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          marginBottom: 5,
          padding: 0,
          // justifyContent: 'center',
          // alignItems: 'center',
          fontSize: 14,
          color: 'Black',
        },
        tabBarIconStyle: {
          width: '100%',
          height: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',

          // borderWidth: 1,
          // backgroundColor: Colors.white, // Change 'CardStack' to the actual name of your 3rd tab
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          // elevation: 1,
        },

        tabBarShowLabel: false,
      })}>
      {/* Tab Screens */}
      {/* StartStack */}
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused}) => (
            <CustomHomeTabBarButton focused={focused} />
          ),
        }}
      />
      {/* ServicesStack */}
      <Tab.Screen
        name="WishListStack"
        component={WishListStack}
        options={{
          tabBarIcon: props => <CustomWishListTabBarButton {...props} />,
        }}
      />
      {/* CardStack */}
      <Tab.Screen
        name="ShoppingCartStack"
        component={ShoppingCartStack}
        options={{
          tabBarIcon: props => <CustomShoppingCartTabBarButton {...props} />,
        }}
      />

      {/* WalletStack */}
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: props => <CustomSearchTabBarButton {...props} />,
        }}
      />
      {/* ProductsStack */}
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          tabBarIcon: props => <CustomSettingTabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Custom Tab Bar Icons
const CustomHomeTabBarButton: React.FC<{focused: boolean}> = ({focused}) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {focused ? <HomeIcon /> : <HomeIconBlack />}

    <Text
      style={{
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '500',
        color: focused ? Colors.Red : Colors.Black,
        marginTop: hp(3),
      }}>
      Home
    </Text>
  </View>
);

const CustomWishListTabBarButton: React.FC<{focused: boolean}> = ({
  focused,
}) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 8,
    }}>
    {focused ? <HeartIcon /> : <HeartIconBlack />}
    <Text
      style={{
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '500',
        color: focused ? Colors.Red : Colors.Black,
        marginTop: hp(3),
      }}>
      Wishlist
    </Text>
  </View>
);

const CustomShoppingCartTabBarButton: React.FC<{focused: boolean}> = ({
  focused,
}) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: Colors.Transparent,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 8,
      bottom: hp(22),
    }}>
    <View
      style={{
        backgroundColor: Colors.white,
        height: '75%',

        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 5,

        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
      }}>
      {focused ? <ShoppingKartIcon /> : <ShoppingKartIconBlack />}
    </View>
  </View>
);

const CustomSearchTabBarButton: React.FC<{focused: boolean}> = ({focused}) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 8,
    }}>
    {focused ? <SearchIcon /> : <SearchIconBlack />}
    <Text
      style={{
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '500',
        color: focused ? Colors.Red : Colors.Black,
        marginTop: hp(3),
      }}>
      Search
    </Text>
  </View>
);

const CustomSettingTabBarButton: React.FC<{focused: boolean}> = ({focused}) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 8,
    }}>
    {focused ? <SettingsIcon /> : <SettingsIconBlack />}
    <Text
      style={{
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '500',
        color: focused ? Colors.Red : Colors.Black,
        marginTop: hp(3),
      }}>
      Setting
    </Text>
  </View>
);

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? '11%' : '10%',
    // justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0,
    borderTopColor: Colors.Transparent,
    elevation: 2,
    shadowOpacity: 0,

    borderWidth: 1,
  },
  tabBarBtnMainContainer: {
    // width: RF(75),
    // height: RF(75),
    // marginTop: RF(13),
    width: 20,
    height: 20,
    borderWidth: 1,
  },
  tabBarBtnMainContainerClose: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: 20,
    height: 20,
  },
  btnContainerClose: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: Colors.Red,
  },
  mt10: {
    marginTop: 10,
  },
  homeImage: {
    width: 24,
    height: 24,
  },
});

export default MyTabs;
