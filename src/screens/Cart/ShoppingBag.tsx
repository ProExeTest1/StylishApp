import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import HeartIconBlack from '../../assets/SVGs/WishlistIcons/HeartIconBlack.svg';
import HeartIconFilled from '../../assets/SVGs/WishlistIcons/HeartIconFilled.svg';
import ScreenTemplate from '../../components/ScreenTemplate';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import {setAddresses, setMainAddress, setProducts} from '../../Store/Reducer';
import ShoppingList from '../../components/ShoppingList';
import {Products} from '../../helpers/interface';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomDropdown from '../../components/CustomDropdown';
import ApplyCoupons from '../../assets/SVGs/ApplyCoupons.svg';
import BackIcon from '../../assets/SVGs/BackIcon.svg';

const ShoppingBag = () => {
  const [filterModel, setFilterModel] = useState(false);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const [hearts, setHearts] = useState([]);
  const route = useRoute();
  const item = route.params?.item;
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(1);
  const today = new Date();
  const DeliveryDate = new Date(today.setDate(today.getDate() + 5));

  useEffect(() => {
    const data = stateData.products;
    const tempData = data.filter(
      ({category}, index) =>
        !data.some((_, i) => i !== index && _.category === category),
    );

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();

    // Set filterData
  }, [stateData.products]);

  const handleBackPress = () => {
    ShowBottomTab();
    return true;
  };
  const ShowBottomTab = () => {
    navigation.getParent()?.setOptions({
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
    });
  };
  const handleSort = () => {
    setFilterModel(true);
  };

  const Back = () => {
    ShowBottomTab();
    navigation.goBack();
  };

  const HeartSelection = (item: Products) => {
    const updatedProducts = stateData.products.map((ele: Products) => {
      if (ele.id === item.id) {
        const updatedEle = Object.assign({}, ele); // Create a new object by copying properties
        updatedEle.fav = !updatedEle.fav; // Update the 'fav' property
        if (hearts.includes(item.id)) {
          const tempArray = hearts.filter(heart => heart != item.id);
          setHearts(tempArray);
        } else setHearts([...hearts, item.id]);
        return updatedEle;
      } else {
        return ele;
      }
    });
    dispatch(setProducts(updatedProducts));
    console.log(
      'updatedProducts in Products List ------------------------- ',
      updatedProducts,
    );
  };

  return (
    <ScreenTemplate style={styles.mainTemplate}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.drawerIcon} onPress={Back}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.profilePic}>
          <Text style={styles.ShoppingBagText}>Shopping Bag</Text>
        </View>
        <TouchableOpacity
          style={styles.HeartIconBlack}
          onPress={() => HeartSelection(item)}>
          {hearts.includes(item.id) || item.fav == true ? (
            <HeartIconFilled />
          ) : (
            <HeartIconBlack />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* <ShoppingList Data={stateData.cartarray} /> */}
        <Pressable style={styles.mainContainer}>
          <View style={styles.renderItemContainer}>
            <View style={styles.ProductImage}>
              <Image
                source={{uri: item.thumbnail}}
                resizeMode="contain"
                style={styles.ShoppingListImage}
              />
            </View>
            <View style={styles.ProductDetails}>
              <Text style={styles.TitleText}>{item.title}</Text>
              <Text style={styles.DescText}>{item.category}</Text>
              <View style={styles.DropDownView}>
                <CustomDropdown
                  items={[1, 2, 3, 4, 5]}
                  selectedValue={selectedValue.toString()}
                  onValueChange={value => setSelectedValue(value)}
                  placeholder="Qty 1"
                />
              </View>
              <View style={styles.DeliverybyView}>
                <Text style={styles.Rating}>Delivery by</Text>
                <Text style={[styles.DeliveryDate]}>
                  {DeliveryDate.toLocaleDateString('en-IN')}
                </Text>
              </View>

              <View></View>
            </View>
          </View>
          {/* <View style={styles.hrLine}></View> */}
          <View style={styles.TotalOrderView}>
            <View style={styles.ApplyCouponIcon}>
              <View style={styles.ApplyIcon}>
                <ApplyCoupons />
              </View>
              <Text style={styles.TotalOrderText}>Apply Coupons</Text>
            </View>
            <Text style={styles.TotalOrderPriceText}>Select</Text>
          </View>

          <View style={styles.hrLine}></View>

          <Text style={styles.OrderPaymentDetText}>Order Payment Details</Text>

          <View style={styles.AmountsView}>
            <View style={styles.OrderAmountsView}>
              <Text style={[styles.OrderAmountsText]}>Order Amounts</Text>

              <Text style={[styles.OrderAmountsText, {fontWeight: '600'}]}>
                ${selectedValue * item.price}
              </Text>
            </View>
            <View style={styles.OrderAmountsView}>
              <Text style={[styles.OrderAmountsText]}>Convenience</Text>

              <Text
                style={[
                  styles.OrderAmountsText,
                  {fontWeight: '600', color: Colors.Red},
                ]}>
                Apply Coupon
              </Text>
            </View>
            <View style={styles.OrderAmountsView}>
              <Text style={[styles.OrderAmountsText]}>Delivery Fee</Text>

              <Text
                style={[
                  styles.OrderAmountsText,
                  {fontWeight: '600', color: Colors.Red},
                ]}>
                Free
              </Text>
            </View>
          </View>

          <View style={styles.hrLine}></View>

          <View style={[styles.AmountsView, {marginTop: hp(29)}]}>
            <View style={styles.OrderAmountsView}>
              <Text style={[styles.OrderAmountsText]}>Order Total</Text>

              <Text style={[styles.OrderAmountsText, {fontWeight: '600'}]}>
                ${selectedValue * item.price}
              </Text>
            </View>
            <View
              style={[styles.OrderAmountsView, {justifyContent: 'flex-start'}]}>
              <Text style={[styles.OrderAmountsText]}>EMI Available</Text>

              <Text
                style={[
                  styles.OrderAmountsText,
                  {fontWeight: '600', color: Colors.Red, marginLeft: wp(22)},
                ]}>
                Details
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
      <View style={styles.PaymentsView}>
        <View style={styles.paymentscontainer}>
          <Text style={styles.priceTextPayment}>
            ${selectedValue * item.price}
          </Text>
          <Text style={styles.ViewDetailsPayment}>View Details</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.ProceedPayTouch}>
            <Text style={styles.ProceedText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerIcon: {
    width: '20%',
  },
  profilePic: {
    width: '60%',
    alignItems: 'center',
  },
  HeartIconBlack: {
    width: '20%',
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
    marginTop: hp(10),
  },
  backIcon: {
    fontSize: fs(25),
  },
  ShoppingBagText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(18),
    color: Colors.Black,
  },
  mainContainer: {
    marginBottom: hp(50),

    borderWidth: 0.1,
    height: hp(200),
    width: '100%',
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0.3, height: 1},
    // shadowOpacity: 0.2,
    // shadowRadius: 0.5,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    backgroundColor: Colors.white,
  },
  renderItemContainer: {
    marginRight: wp(12),
    width: wp(170),
    marginBottom: hp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 0.17,
    height: 'auto',
  },
  ProductImage: {},
  hrLine: {
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 0.3},
    // shadowOpacity: 0.3,
    // shadowRadius: 0.3,
    zIndex: 0,
    borderWidth: 0.5,
    borderColor: Colors.LightGrey,
    // marginTop: hp(18),
    bottom: hp(20),
    marginHorizontal: wp(-12),
  },
  HeartSelection: {
    position: 'absolute',
    // zIndex: 1,
    alignSelf: 'flex-end',
  },
  ShoppingListImage: {
    height: hp(167),
    width: wp(170),
    // borderWidth: 1,
  },
  TitleText: {
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '500',
    fontSize: fs(17),
    marginTop: hp(15),
    color: Colors.Black,
  },
  ProductDetails: {
    marginLeft: wp(15),
    // borderWidth: 1,
  },
  DescText: {
    width: wp(162),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '400',
    fontSize: fs(12),
    marginTop: hp(5),
    color: Colors.Black,
  },
  Rating: {
    fontSize: fs(13),
    width: wp(72),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '400',
    // marginTop: hp(2),
    color: Colors.Black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DeliveryDate: {
    width: wp(100),
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fs(16),
    fontWeight: '600',
  },
  PriceText: {
    width: wp(90),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '500',
    fontSize: fs(17),
    marginTop: hp(5),
    color: Colors.Black,
    borderWidth: 0.3,
    textAlign: 'center',
    borderRadius: 10,
    paddingVertical: hp(5),
    paddingHorizontal: wp(5),
  },
  TotalOrderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(30),
    marginTop: hp(10),
  },
  TotalOrderText: {
    fontSize: fs(12),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    color: Colors.Black,
    bottom: hp(10),
    marginLeft: wp(15),
  },
  TotalOrderPriceText: {
    fontSize: fs(12),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    color: Colors.Red,
    bottom: hp(10),
  },
  DropDownView: {
    marginTop: hp(5),
    zIndex: 4,
  },
  DeliverybyView: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(5),
  },
  ApplyCouponIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ApplyIcon: {
    bottom: hp(10),
  },
  OrderPaymentDetText: {
    zIndex: -3,
    fontSize: fs(17),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    color: Colors.Black,
  },
  AmountsView: {
    marginTop: hp(50),
    marginBottom: hp(44),
  },
  OrderAmountsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(12),
  },
  OrderAmountsText: {
    fontSize: fs(12),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    color: Colors.Black,
    bottom: hp(10),
    // marginLeft: wp(15),
  },
  mainTemplate: {
    backgroundColor: Colors.white,
  },
  PaymentsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.ProceedPaymentBackground,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingTop: hp(32),
    borderColor: Colors.LightGrey,
    // borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginVertical: hp(-16),
    marginHorizontal: wp(-16),
    paddingVertical: hp(16),
    paddingHorizontal: wp(16),
  },
  ProceedPayTouch: {
    backgroundColor: Colors.ForgetPass,
    paddingVertical: hp(13),
    paddingHorizontal: wp(13),
    width: wp(219),
    alignItems: 'center',
    borderRadius: 5,
  },
  ProceedText: {
    color: Colors.white,
    fontSize: fs(17),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '100',
  },
  priceTextPayment: {
    color: Colors.Black,
    fontSize: fs(16),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  ViewDetailsPayment: {
    color: Colors.ForgetPass,
    fontSize: fs(12),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  paymentscontainer: {
    justifyContent: 'center',
  },
});

export default ShoppingBag;
