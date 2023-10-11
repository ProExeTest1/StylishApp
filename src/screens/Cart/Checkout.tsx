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

import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import ScreenTemplate from '../../components/ScreenTemplate';
import ShoppingList from '../../components/ShoppingList';

const Checkout = () => {
  const [filterModel, setFilterModel] = useState(false);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const route = useRoute();
  const item = route.params?.item;
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [addressCards, setAddressCards] = useState([{}]);

  const addAddressCard = () => {
    setAddressCards([...addressCards, {}]);
  };

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
                <TextInput style={styles.addressTextInput} multiline />
              </View>
              {addressCards.length - 1 == index ? (
                <TouchableOpacity
                  style={styles.addressCardPlusButton}
                  onPress={addAddressCard}>
                  <PlusIcon />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          horizontal
        />
      </View>

      <Text style={styles.ShoppingListText}>Shopping List</Text>

      <ScrollView style={styles.scrollView}>
        <ShoppingList Data={stateData.cartarray} />
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
    height: hp(29),
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
    borderWidth: 0.3,
    height: hp(89),
    width: wp(254),
    marginTop: hp(10),
    marginRight: wp(6),
  },
  addressText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: fs(12),
    color: Colors.Black,
    marginBottom: hp(9),
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
    shadowOffset: {width: 0, height: 0.3},
    shadowOpacity: 0.3,
    shadowRadius: 0.3,
    borderWidth: 0.3,
    borderColor: Colors.LightGrey,
    marginTop: hp(18),
    marginHorizontal: wp(-12),
  },
  addressCardPlusButton: {
    width: wp(89),
    height: hp(89),
    // borderWidth: 1,
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: wp(-20),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.3},
    shadowOpacity: 0.3,
    shadowRadius: 0.3,
    borderWidth: 0.3,
  },
  addressCardContainer: {
    flexDirection: 'row',
  },
  ShoppingListText: {
    marginTop: wp(24),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(14),
    color: Colors.Black,
  },
});

export default Checkout;
