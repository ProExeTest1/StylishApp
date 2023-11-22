import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import BackIcon from '../../assets/SVGs/BackIcon.svg';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import ScreenTemplate from '../../components/ScreenTemplate';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShipAddComponent from '../../components/ShipAddComponent';
import ReactNativeModal from 'react-native-modal';
import {Images} from '../../helpers/images';
import {setAddresses} from '../../Store/Reducer';

const Shippingaddresses = () => {
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const navigation = useNavigation();

  const [filterModel, setFilterModel] = useState(false);
  const [flatnum, setFlatNum] = useState('');
  const [modalId, setModalId] = useState(0);
  const [socname, setSocName] = useState('');
  const [streetname, setStreetName] = useState('');
  const [pin, setPin] = useState('');
  const [city, setCity] = useState('');

  const Back = () => {
    navigation.goBack();
  };
  const closeModal = () => {
    console.log('close');
    setModalId(0);
    setCity('');
    setFlatNum('');
    setPin('');
    setSocName('');
    setStreetName('');
    setFilterModel(false);
  };

  const handleAddress = item => {
    console.log('item', item);
    // dispatch(setMainAddress(text));
    setModalId(item?.id || 0);
    setCity(item?.city);
    setFlatNum(item?.flatNo);
    setPin(item?.pin);
    setSocName(item?.societyName);
    setStreetName(item?.streetName);
    setFilterModel(true);
  };

  const ContinueAddress = () => {
    let Numreg = /^\d+$/;

    const passData = {
      isNew: modalId == 0 ? true : false,
      data: {
        id: modalId == 0 ? stateData.addresses?.length + 1 : modalId,
        flatNo: flatnum,
        societyName: socname,
        streetName: streetname,
        pin: pin,
        city: city,
      },
    };

    if (flatnum == '') Alert.alert('Please enter Flat Number');
    else if (socname == '') Alert.alert('Please enter Society Name');
    else if (streetname == '') Alert.alert('Please enter Street Name');
    else if (city == '') Alert.alert('Please enter city Name');
    else if (!pin.match(Numreg)) Alert.alert('Enter valid Pincode');
    else {
      dispatch(setAddresses(passData));
      setCity('');
      setFlatNum('');
      setPin('');
      setSocName('');
      setStreetName('');
      setFilterModel(false);
      setModalId(0);
    }
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
          <Text style={styles.ShippingaddressesText}>Shipping Addresses</Text>
        </View>
        <View />
      </View>
      <ShipAddComponent Data={stateData.addresses} />
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ShippingaddressesText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(18),
    color: Colors.Black,
  },
  FilterModalView: {
    height: hp(400),
    width: '100%',
    backgroundColor: 'white',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    paddingHorizontal: wp(20),
  },
  SortText: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: fs(20),
    marginTop: hp(20),
    // alignSelf: 'center',
  },
  FilterSortTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    height: hp(18),
    width: wp(18),
    marginTop: hp(20),
  },
  FlatNum: {
    borderWidth: 0.5,
    marginTop: hp(15),
    paddingVertical: hp(10),
    paddingHorizontal: wp(10),
  },
  PinCityView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressView: {
    marginTop: hp(20),
  },
  ContinueTouch: {
    borderWidth: 0.5,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
    backgroundColor: Colors.ForgetPass,
  },
  ContinueAddText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: fs(16),
    color: Colors.white,
  },
});

export default Shippingaddresses;
