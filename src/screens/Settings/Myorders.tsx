import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import BackIcon from '../../assets/SVGs/BackIcon.svg';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import ScreenTemplate from '../../components/ScreenTemplate';
import ProductsList from '../../components/ProductsList';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MyOrdersList from '../../components/MyOrdersList';
import {ScrollView} from 'react-native-gesture-handler';

const Myorders = () => {
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const navigation = useNavigation();

  console.log(
    'My Orders Screen ------(stateData.myorders)---------- ',
    stateData.myorders,
  );

  const Back = () => {
    navigation.goBack();
  };

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{bottom: 10, left: 10, right: 10, top: 10}}
          onPress={Back}>
          <BackIcon />
        </TouchableOpacity>
        <View>
          <Text style={styles.MyordersText}>My Orders</Text>
        </View>
        <View />
      </View>
      <ScrollView
        style={styles.MyOrdersView}
        showsVerticalScrollIndicator={false}>
        <MyOrdersList Data={stateData.myorders} />
      </ScrollView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MyordersText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(18),
    color: Colors.Black,
  },
  MyOrdersView: {
    marginTop: hp(13),
  },
});

export default Myorders;
