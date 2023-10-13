import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import HeartIconBlack from '../../assets/SVGs/WishlistIcons/HeartIconBlack.svg';
import HeartIconFilled from '../../assets/SVGs/WishlistIcons/HeartIconFilled.svg';
import ScreenTemplate from '../../components/ScreenTemplate';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import {setAddresses, setMainAddress} from '../../Store/Reducer';
import ShoppingList from '../../components/ShoppingList';

const ShoppingBag = () => {
  const [filterModel, setFilterModel] = useState(false);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const [hearts, setHearts] = useState([]);
  const route = useRoute();
  const item = route.params?.item;
  const navigation = useNavigation();

  useEffect(() => {
    const data = stateData.products;
    const tempData = data.filter(
      ({category}, index) =>
        !data.some((_, i) => i !== index && _.category === category),
    );

    // Set filterData
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
          <Text style={styles.ShoppingBagText}>ShoppingBag</Text>
        </View>
        <View style={styles.HeartIconBlack}>
          <HeartIconBlack />
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* <ShoppingList Data={stateData.cartarray} /> */}
        <Pressable style={styles.mainContainer}>
          <View style={styles.renderItemContainer}>
            <View style={styles.ProductImage}>
              <TouchableOpacity
                style={styles.HeartSelection}
                //   onPress={() => HeartSelection(item)}
              >
                {hearts.includes(item.id) || item.fav == true ? (
                  <HeartIconFilled />
                ) : (
                  <HeartIconBlack />
                )}
              </TouchableOpacity>
              <Image
                source={{uri: item.thumbnail}}
                resizeMode="contain"
                style={styles.ShoppingListImage}
              />
            </View>
            <View style={styles.ProductDetails}>
              <Text style={styles.TitleText}>{item.title}</Text>
              <Text style={styles.DescText}>
                {item.description.substring(0, 70)}...
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* <Text style={styles.MRPText}>₹{item.MRP}</Text> */}
                {/* <Text style={styles.DiscountText}>{item.Discount}%Off</Text> */}
              </View>
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.Rating}>⭐⭐⭐⭐⭐</Text>
                <Text style={[styles.Rating, {fontSize: fs(14)}]}>
                  {' '}
                  {item.ratingcount}
                </Text>
              </View> */}

              <View></View>
            </View>
          </View>
          <View style={styles.hrLine}></View>
          <View style={styles.TotalOrderView}>
            <Text style={styles.TotalOrderText}>Total Order (1) :</Text>
            <Text style={styles.TotalOrderPriceText}>${item.price}</Text>
          </View>
        </Pressable>
      </ScrollView>
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
    elevation: 2,
    borderWidth: 0.1,
    height: hp(200),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0.3, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
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
    borderWidth: 0.5,
    borderColor: Colors.LightGrey,
    // marginTop: hp(18),
    bottom: hp(20),
    marginHorizontal: wp(-12),
  },
  HeartSelection: {
    position: 'absolute',
    zIndex: 1,
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
    marginTop: hp(5),
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
    fontSize: fs(10),
    marginTop: hp(5),
    color: Colors.Black,
  },
  Rating: {
    fontSize: fs(10),
    width: wp(62),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '400',
    // marginTop: hp(2),
    color: Colors.Grey,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  TotalOrderText: {
    fontSize: fs(12),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    color: Colors.Black,
    bottom: hp(10),
  },
  TotalOrderPriceText: {
    fontSize: fs(12),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    color: Colors.Black,
    bottom: hp(10),
  },
});

export default ShoppingBag;
