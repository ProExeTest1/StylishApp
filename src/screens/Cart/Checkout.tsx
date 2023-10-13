import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Location from '../../assets/SVGs/Location.svg';
import EditIcon from '../../assets/SVGs/EditIcon.svg';
import PlusIcon from '../../assets/SVGs/PlusIcon.svg';
import VisacardIcon from '../../assets/SVGs/VisacardIcon.svg';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import ScreenTemplate from '../../components/ScreenTemplate';
import ShoppingList from '../../components/ShoppingList';
import {AddressCards, Products} from '../../helpers/interface';
import {setAddresses, setMainAddress} from '../../Store/Reducer';
import firestore from '@react-native-firebase/firestore';

const Checkout = () => {
  const [filterModel, setFilterModel] = useState(false);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const route = useRoute();
  const item = route.params?.item;
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [addressCards, setAddressCards] = useState([{id: 0, address: ''}]);
  const [address, setAddress] = useState('');
  const [textInputDis, setTextInputDis] = useState(true);

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

  const priceArray = stateData.cartarray.map((item: Products) => {
    return (priceCount += item.price);
  });

  const addAddressFirestore = () => {
    // firestore()
    //   .collection('Users')
    //   .doc(`${G_UserInfo.user.id}`)
    //   .set({
    //     name: 'john',
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //     navigation.navigate('MyTabs', {G_UserInfo});
    //   });
  };

  const AddressStore = () => {
    dispatch(setAddresses([...stateData.addresses, stateData.mainAddress]));
  };
  const setAddressRedux = (text: string) => {
    dispatch(setMainAddress(text));
  };
  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <TouchableOpacity style={styles.drawerIcon} onPress={Back}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.profilePic}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.hrLine}></View>

        <View style={styles.deliveryAddView}>
          <Location />
          <Text style={styles.deliveryAddText}>Delivery Address</Text>
        </View>

        <View style={styles.addressCardContainer}>
          <FlatList
            data={addressCards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{flexDirection: 'row'}}>
                <View style={styles.addressCard} key={index}>
                  <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                    <EditIcon />
                  </TouchableOpacity>
                  <Text style={styles.addressText}>Address :</Text>
                  <TextInput
                    style={styles.addressTextInput}
                    multiline
                    placeholder="Enter Address..."
                    placeholderTextColor={Colors.Grey}
                    onChangeText={text => setAddress(text)}
                    // editable={addressCards.length - 1 != item.id ? false : true}
                    editable={true}
                    value={item.address}
                  />
                </View>
                {addressCards.length - 1 == index ? (
                  <TouchableOpacity
                    style={styles.addressCardPlusButton}
                    // onPress={addAddressCard}
                  >
                    <PlusIcon />
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
            horizontal
          />
        </View>

        <Text style={styles.ShoppingListText}>Shopping List</Text>

        <ShoppingList Data={stateData.cartarray} />
        <View style={styles.OrderTotalView}>
          <View style={styles.OrderView}>
            <Text style={styles.OrderText}>Order</Text>
            <Text style={styles.OrderText}>${priceCount}</Text>
          </View>
          <View style={styles.OrderView}>
            <Text style={styles.OrderText}>Shipping</Text>
            <Text style={styles.OrderText}>${5}</Text>
          </View>
          <View style={styles.OrderView}>
            <Text style={[styles.OrderText, {color: Colors.Black}]}>Total</Text>
            <Text style={[styles.OrderText, {color: Colors.Black}]}>
              ${priceCount + 5}
            </Text>
          </View>
        </View>
        <View style={[styles.hrLine, {bottom: hp(40)}]}></View>
        <View style={[styles.OrderView, {paddingHorizontal: wp(10)}]}>
          <Text style={[styles.OrderText, {color: Colors.Black}]}>Payment</Text>
        </View>
        {[1, 2, 3, 4].map(item => (
          <View style={styles.PaymentComponent}>
            <VisacardIcon />
            <Text style={styles.OrderText}>{`******5307`}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.ContinueComponent}>
          <Text style={styles.ContinueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  drawerIcon: {width: '38%'},
  profilePic: {width: '100%', position: 'absolute', alignItems: 'center'},
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
});

export default Checkout;
