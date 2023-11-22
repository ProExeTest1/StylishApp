import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Location from '../../assets/SVGs/Location.svg';
import EditIcon from '../../assets/SVGs/EditIcon.svg';
import PlusIcon from '../../assets/SVGs/PlusIcon.svg';
import VisacardIcon from '../../assets/SVGs/VisacardIcon.svg';
import BackIcon from '../../assets/SVGs/BackIcon.svg';
import RightTick from '../../assets/SVGs/RightTick.svg';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import ScreenTemplate from '../../components/ScreenTemplate';
import ShoppingList from '../../components/ShoppingList';
import {AddressCards, Products} from '../../helpers/interface';
import {
  setAddresses,
  setAddresses2,
  setMainAddress,
  setMyorders,
} from '../../Store/Reducer';
import firestore from '@react-native-firebase/firestore';
import ReactNativeModal from 'react-native-modal';
import {Images} from '../../helpers/images';
import auth from '@react-native-firebase/auth';

const Checkout = () => {
  const [filterModel, setFilterModel] = useState(false);
  const [filterModel2, setFilterModel2] = useState(false);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const route = useRoute();
  const item = route?.params?.item;
  const Qty = route?.params?.Qty;
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [addressCards, setAddressCards] = useState([{}]);
  // const [address, setAddress] = useState('');
  const [textInputDis, setTextInputDis] = useState(true);

  const [flatnum, setFlatNum] = useState('');
  const [modalId, setModalId] = useState(0);
  console.log('modalId 2435678976854', modalId);

  const [socname, setSocName] = useState('');
  const [streetname, setStreetName] = useState('');
  const [pin, setPin] = useState('');
  const [city, setCity] = useState('');

  console.log('item in Checkout screen ------ ', item);

  useEffect(() => {
    const data = stateData.products;
    const tempData = data.filter(
      ({category}, index) =>
        !data.some((_, i) => i !== index && _.category === category),
    );

    setFilterData(tempData);
  }, [stateData.products]);

  const handleSort = () => {
    setFilterModel(true);
  };

  const Back = () => {
    navigation.goBack();
  };

  let priceCount = 0;

  const priceArray = item
    ? [item].map((item: Products) => {
        return (priceCount += item.price);
      })
    : stateData.cartarray.map((item: Products) => {
        return (priceCount += item.price);
      });

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

  const closeModal2 = () => {
    console.log('close');
    setModalId(0);
    setCity('');
    setFlatNum('');
    setPin('');
    setSocName('');
    setStreetName('');
    setFilterModel2(false);
  };

  console.log('stateData.addresses', stateData.addresses);

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

  const handleContinueButton = () => {
    setFilterModel2(true);
    if (item) {
      const dataArray = [...stateData.myorders];
      // const dataArray2 = dataArray;
      // dataArray.push(item);
      const dataArray2 = [item].concat(dataArray);
      console.log('dataArray-----------', dataArray2);

      dispatch(setMyorders(dataArray2));

      firestore()
        .collection('Users')
        .doc(`myorders-${auth()?.currentUser?.uid}`)
        .set({
          ...dataArray2,
        })
        .then(() => {
          console.log('myorders Data added!');
          // FirestoreGet(); // Fetch updated data after adding a new user
        });
    } else {
      const dataArray = [...stateData.myorders];
      dispatch(setMyorders([...stateData.cartarray, ...stateData.myorders]));
      firestore()
        .collection('Users')
        .doc(`myorders-${auth()?.currentUser?.uid}`)
        .set({
          ...[...stateData.cartarray, ...stateData.myorders],
        })
        .then(() => {
          console.log('myorders Data added!');
          // FirestoreGet(); // Fetch updated data after adding a new user
        });
    }
  };

  const CloseTouch = () => {
    item
      ? navigation.navigate('ShoppingBag', {item: item})
      : setFilterModel2(false);
    navigation.goBack();
  };

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{bottom: 10, left: 10, right: 10, top: 10}}
          style={styles.drawerIcon}
          onPress={Back}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.profilePic}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </View>
        <View />
      </View>

      {stateData.cartarray.length > 0 || item ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.hrLine}></View>

          <View style={styles.deliveryAddView}>
            <Location />
            <Text style={styles.deliveryAddText}>Delivery Address</Text>
          </View>

          <View style={styles.addressCardContainer}>
            <FlatList
              data={stateData.addresses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.addressCard} key={index}>
                    <TouchableOpacity
                      style={{alignSelf: 'flex-end'}}
                      // onPress={() => setFilterModel(!filterModel)}
                      onPress={() => handleAddress(item)}>
                      <EditIcon />
                    </TouchableOpacity>
                    <Text style={styles.addressText}>Address :</Text>
                    <Text style={styles.addressContainedText}>
                      {item?.flatNo} {item?.societyName} {item?.streetName}{' '}
                      {item?.city},{item?.pin}
                    </Text>
                  </View>
                </View>
              )}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.addressCardPlusButton}
                  onPress={() => handleAddress('')}
                  // onPress={() => handleAddress()}
                >
                  <PlusIcon />
                </TouchableOpacity>
              }
              horizontal
            />
          </View>

          <Text style={styles.ShoppingListText}>Shopping List</Text>

          <ShoppingList Data={item ? [item] : stateData.cartarray} />
          {/* <ShoppingList
            Data={item ? stateData.cartarray : stateData.cartarray}
          /> */}

          <View style={styles.OrderTotalView}>
            <View style={styles.OrderView}>
              <Text style={styles.OrderText}>Order</Text>
              <Text style={styles.OrderText}>
                ${Qty ? priceCount * Qty : priceCount}
              </Text>
            </View>
            <View style={styles.OrderView}>
              <Text style={styles.OrderText}>Shipping</Text>
              <Text style={styles.OrderText}>${5}</Text>
            </View>
            <View style={styles.OrderView}>
              <Text style={[styles.OrderText, {color: Colors.Black}]}>
                Total
              </Text>
              <Text style={[styles.OrderText, {color: Colors.Black}]}>
                ${Qty ? priceCount * Qty + 5 : priceCount + 5}
              </Text>
            </View>
          </View>
          <View style={[styles.hrLine, {bottom: hp(40)}]}></View>
          <View style={[styles.OrderView, {paddingHorizontal: wp(10)}]}>
            <Text style={[styles.OrderText, {color: Colors.Black}]}>
              Payment
            </Text>
          </View>
          {[1, 2, 3, 4].map(item => (
            <View style={styles.PaymentComponent}>
              <VisacardIcon />
              <Text style={styles.OrderText}>{`******5307`}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.ContinueComponent}
            onPress={handleContinueButton}>
            <Text style={styles.ContinueText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.EmptyBoxIllustratorView}>
          <Image
            source={Images.EmptyBoxIllustrator}
            style={styles.EmptyBoxIllustrator}
          />
        </View>
      )}

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

      {filterModel2 && (
        <ReactNativeModal
          isVisible={filterModel2}
          swipeDirection={'down'}
          onSwipeComplete={closeModal2}
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}>
          <View style={styles.FilterModalView2}>
            <TouchableOpacity style={styles.closeTouch} onPress={CloseTouch}>
              <Image source={Images.closeIcon} style={styles.closeIconStyle} />
            </TouchableOpacity>
            <ImageBackground
              source={Images.PaymentDone}
              style={styles.PaymentDone}
              // tintColor={Colors.ForgetPass}
            >
              <RightTick />
            </ImageBackground>
            <Text style={styles.paymentDoneText}>
              Payment done successfully
            </Text>
          </View>
        </ReactNativeModal>
      )}
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  addressTextInput: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: fs(12),
    color: Colors.Black,
    height: hp(35),
  },
  addressCardView: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollView: {flex: 1, marginTop: hp(10)},
  addressCard: {
    paddingVertical: hp(12),
    paddingHorizontal: wp(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // borderWidth: 0.3,
    height: hp(79),
    width: wp(241),
    marginTop: hp(10),
    marginRight: wp(12),
    marginLeft: wp(5),
    backgroundColor: Colors.white,
  },
  addressText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: fs(12),
    color: Colors.Black,
    marginBottom: hp(4),
  },
  backIcon: {fontSize: fs(25)},
  checkoutText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(18),
    color: Colors.Black,
  },
  deliveryAddView: {
    flexDirection: 'row',
    marginTop: hp(18),
    marginLeft: wp(6),
  },
  deliveryAddText: {
    marginLeft: wp(8),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(14),
    color: Colors.Black,
  },
  hrLine: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.1},
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    borderWidth: 0.25,
    borderColor: Colors.LightGrey,
    marginTop: hp(18),
    marginHorizontal: wp(-12),
  },
  addressCardPlusButton: {
    width: wp(78),
    height: hp(79),
    // borderWidth: 1,
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: wp(-20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // borderWidth: 0.3,
    backgroundColor: Colors.white,
  },
  addressCardContainer: {
    flexDirection: 'row',
    paddingVertical: hp(5),
    paddingHorizontal: wp(5),
    height: hp(100),
  },
  ShoppingListText: {
    marginTop: wp(24),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(14),
    color: Colors.Black,
  },
  OrderTotalView: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    bottom: hp(20),
    marginTop: hp(20),
  },
  OrderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(18),
  },
  OrderText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(18),
    color: Colors.Grey,
  },
  PaymentComponent: {
    width: wp(339),
    height: hp(59),
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: wp(15),
    paddingVertical: hp(15),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(10),
  },
  ContinueText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: fs(22),
    color: Colors.white,
  },
  ContinueComponent: {
    width: wp(339),
    height: hp(59),
    borderRadius: 8,
    // borderWidth: 1,
    paddingHorizontal: wp(15),
    paddingVertical: hp(15),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(10),
    marginTop: hp(15),
    backgroundColor: Colors.ForgetPass,
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
  EmptyBoxIllustrator: {
    height: hp(100),
    width: wp(100),
  },
  EmptyBoxIllustratorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FilterModalView2: {
    height: hp(221),
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 6,
    paddingHorizontal: wp(20),
  },
  PaymentDone: {
    height: hp(91),
    width: wp(91),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentDoneText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(14),
    color: Colors.Black,
  },
  closeIconStyle: {
    height: hp(15),
    width: wp(15),
  },
  closeTouch: {
    // borderWidth: 1,
    width: '100%',
  },
  addressContainedText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: fs(12),
    color: Colors.Black,
    marginBottom: hp(4),
  },
});

export default Checkout;
