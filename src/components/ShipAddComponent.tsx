import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';
import {Products} from '../helpers/interface';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setAddresses, setProducts} from '../Store/Reducer';
import Rating from './Rating';
import EmptyIllustrator from './EmptyIllustrator';
import ReactNativeModal from 'react-native-modal';
import {Images} from '../helpers/images';
import EditIcon from '../assets/SVGs/EditIcon.svg';
import PlusIcon from '../assets/SVGs/PlusIcon.svg';
import firestore from '@react-native-firebase/firestore';

interface ShipAddComponentProps {
  Data?: Array<Products>;
  name?: string;
}

const ShipAddComponent = (props: ShipAddComponentProps) => {
  const [index, setIndex] = useState(2);
  const [hearts, setHearts] = useState([]);
  const flatListRef = useRef<FlatList>(null);
  const [fav, setFav] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params;
  const dispatch = useDispatch();

  const stateData = useSelector(state => state.Reducers);

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

      firestore()
        .collection('Users')
        .doc(`Addresses-${auth()?.currentUser?.uid}`)
        .set({
          ...[...stateData.addresses, passData.data],
        })
        .then(() => {
          console.log('Addresses added!');
          // FirestoreGet(); // Fetch updated data after adding a new user
        });

      setCity('');
      setFlatNum('');
      setPin('');
      setSocName('');
      setStreetName('');
      setFilterModel(false);
      setModalId(0);
    }
  };

  useEffect(() => {
    const tempArray = stateData.products
      ?.filter(ele => ele.fav === true)
      .map(ele => ele.id);

    setHearts(tempArray);

    console.log('UseEffect--------------props.Data', props.Data);
    console.log('UseEffect--------------tempArray', tempArray);
    console.log('UseEffect--------------Hearts', hearts);
  }, [stateData.products]);

  const renderItem = ({item}) => {
    console.log('item in ShipAdd Component --------- ', item);

    return (
      <Pressable style={styles.renderItemContainer}>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          // onPress={() => setFilterModel(!filterModel)}
          onPress={() => handleAddress(item)}>
          <EditIcon />
        </TouchableOpacity>
        <View style={styles.addressView}>
          <Text>
            {item.flatNo}, {item.societyName}, {item.streetName}, {item.city} -
            {item.pin}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        pagingEnabled
        data={props.Data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.FlatListStyle}
        // horizontal
        scrollEnabled={false}
        // numColumns={1}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        bounces={false}
        // ListEmptyComponent={<EmptyIllustrator />}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.plusIconstyle}
            onPress={() => handleAddress('')}>
            {/* {props.Data?.length > 0 ? <PlusIcon /> : null} */}
            <PlusIcon />
          </TouchableOpacity>
        }
      />
      {filterModel && (
        <ReactNativeModal
          isVisible={filterModel}
          swipeDirection={'down'}
          onSwipeComplete={closeModal}
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}>
          <View style={styles.FilterModalView}>
            <View style={styles.FilterSortTextView}>
              <Text style={styles.SortText}>Address</Text>
              <TouchableOpacity onPress={closeModal}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.FlatNum} >

            </View> */}
            <View style={styles.addressView}>
              <TextInput
                placeholder="Flat No. / Building No."
                placeholderTextColor={Colors.LightGrey}
                style={styles.FlatNum}
                onChangeText={text => setFlatNum(text)}
                value={flatnum}
              />
              <TextInput
                placeholder="Society / Apartment Name"
                placeholderTextColor={Colors.LightGrey}
                style={styles.FlatNum}
                onChangeText={text => setSocName(text)}
                value={socname}
              />
              <TextInput
                placeholder="Street Name / Landmark"
                placeholderTextColor={Colors.LightGrey}
                style={styles.FlatNum}
                onChangeText={text => setStreetName(text)}
                value={streetname}
              />
              <View style={styles.PinCityView}>
                <TextInput
                  placeholder="Pin"
                  placeholderTextColor={Colors.LightGrey}
                  style={[styles.FlatNum, {width: '47%'}]}
                  onChangeText={text => setPin(text)}
                  value={pin}
                />
                <TextInput
                  placeholder="City"
                  placeholderTextColor={Colors.LightGrey}
                  style={[styles.FlatNum, {width: '47%'}]}
                  onChangeText={text => setCity(text)}
                  value={city}
                />
              </View>
              <TouchableOpacity
                style={styles.ContinueTouch}
                onPress={ContinueAddress}>
                <Text style={styles.ContinueAddText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ReactNativeModal>
      )}
    </View>
  );
};

export default ShipAddComponent;

const styles = StyleSheet.create({
  container: {},
  FlatListStyle: {
    backgroundColor: Colors.white,

    // width: 200,
  },
  renderItemContainer: {
    marginRight: wp(12),
    // width: wp(170),
    width: '100%',
    marginTop: hp(12),
    // borderWidth: 0.17,
    height: 'auto',
    paddingHorizontal: wp(10),
    flexDirection: 'row',

    backgroundColor: 'white',

    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  addressView: {
    // backgroundColor: 'red',
    // borderWidth: 0.17,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    // marginTop: hp(10),
    // alignSelf: 'center',
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
  // addressView: {
  //   marginTop: hp(20),
  // },
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
  plusIconstyle: {
    alignItems: 'center',
    alignSelf: 'center',
    // borderWidth: 1,

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,

    backgroundColor: Colors.white,
    marginTop: hp(10),
    width: wp(50),
    paddingVertical: hp(10),
  },
});
