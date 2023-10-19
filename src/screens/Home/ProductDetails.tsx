import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import ScreenTemplate from '../../components/ScreenTemplate';
import PasswordEye2 from '../../assets/SVGs/PasswordEye2.svg';
import Compare from '../../assets/SVGs/Compare.svg';
import ShoppingKartIconBlack from '../../assets/SVGs/ShoppingkartIcons/ShoppingKartIconBlack.svg';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import GoToCart from '../../assets/SVGs/GoToCart.svg';
import BuyNow from '../../assets/SVGs/BuyNow.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {Products} from '../../helpers/interface';
import FilterIcon from '../../assets/SVGs/FilterIcon.svg';
import SortIcon from '../../assets/SVGs/SortIcon.svg';
import ProductsList from '../../components/ProductsList';
import {setCartArray} from '../../Store/Reducer';
import GoToCartIcon from '../../assets/SVGs/GoToCartIcon.svg';
import BuyNowIcon from '../../assets/SVGs/BuyNowIcon.svg';
import BackIcon from '../../assets/SVGs/BackIcon.svg';

const ProductDetails = () => {
  const [filterModel, setFilterModel] = useState(false);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const route = useRoute();
  const item = route?.params?.item;
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [cartText, setCartText] = useState('Go to cart');

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

  const GoToCartFn = () => {
    Alert.alert('Item added to the Cart');
    setCartText('View Cart');
    dispatch(setCartArray([...stateData.cartarray, item]));
  };

  const ViewCart = () => {
    navigation.navigate('Checkout');
  };
  const GotoBuyNow = () => {
    navigation.navigate('ShoppingBag', {item});
  };

  return (
    <ScreenTemplate>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.DrawerIcon} onPress={Back}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.ProfilePic}>
          <ShoppingKartIconBlack />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View
          style={styles.renderItemContainer}
          onPress={() => ProductDetails(item)}>
          <Image
            source={{uri: item.thumbnail}}
            resizeMode="contain"
            style={styles.ProductsListImage}
          />
          <Text style={styles.TitleText}>{item.title}</Text>
          <Text style={styles.PriceText}>${item.price}</Text>
          <View style={styles.RatingContainer}>
            <Text style={styles.Rating}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.RatingCount}>{item.rating.count}</Text>
          </View>
          <Text style={styles.ProductDetailsText}>Product Details</Text>
          <Text style={styles.DescText}>{item.description}</Text>
          <View style={styles.CartBuy}>
            <Pressable
              style={{marginRight: wp(10)}}
              onPress={
                cartText == 'Go to cart' ? () => GoToCartFn() : () => ViewCart()
              }>
              {/* <GoToCart /> */}
              <View style={styles.GocartView}>
                <View style={styles.carticon}>
                  <GoToCartIcon />
                </View>
                <View style={styles.cartbox}>
                  <Text style={styles.gotocartText}>{cartText}</Text>
                </View>
              </View>
            </Pressable>
            <Pressable>
              {/* <BuyNow /> */}
              <View style={[styles.GocartView]}>
                <View
                  style={[styles.carticon, {backgroundColor: Colors.BuyNow}]}>
                  <BuyNowIcon />
                </View>
                <View
                  style={[styles.cartbox, {backgroundColor: Colors.BuyNow}]}>
                  <Text style={[styles.gotocartText]} onPress={GotoBuyNow}>
                    {'Buy Now'}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>

          <View style={styles.DealoftheDay}>
            <View style={styles.DOD1}>
              <Text style={styles.DODText1}>Delivery in</Text>
              <Text style={styles.DODText2}>within 1 Hour</Text>
            </View>
          </View>

          <View style={styles.ViewSimilarContainor}>
            <Pressable style={styles.ViewSimilar}>
              <PasswordEye2 />
              <Text style={styles.ViewSimilarText}>View Similar</Text>
            </Pressable>
            <Pressable style={[styles.ViewSimilar, {paddingLeft: 10}]}>
              <Compare />
              <Text style={styles.ViewSimilarText}>Add to Compare</Text>
            </Pressable>
          </View>

          <Text style={styles.SimilarToText}>Similar To</Text>
          <View style={styles.SimilarToItemsView}>
            <Text style={styles.SimilarToItemsText}>
              {stateData.products.filter(
                (ele: Products) => ele.category == item.category,
              ).length - 1}
              {'+ '}
              Items
            </Text>

            <View style={styles.Features}>
              <Pressable style={styles.Sort} onPress={handleSort}>
                <Text>Sort</Text>
                <SortIcon />
              </Pressable>
              <Pressable style={styles.Filter}>
                <Text>Filter</Text>
                <FilterIcon />
              </Pressable>
            </View>
          </View>

          <View style={styles.ProductList}>
            <ProductsList
              Data={stateData.products.filter(
                (ele: Products) =>
                  ele.category == item.category && ele.id != item.id,
              )}
              name={'productdetails'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Add your modal content here */}
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DrawerIcon: {width: '50%'},
  ProfilePic: {width: '50%', alignItems: 'flex-end'},
  scrollView: {flex: 1},
  renderItemContainer: {
    marginHorizontal: wp(12),
    marginBottom: hp(12),
  },
  ProductsListImage: {height: hp(213), width: '100%'},
  TitleText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: fs(20),
    marginTop: hp(5),
    color: Colors.Black,
  },
  PriceText: {
    width: wp(66),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: fs(15),
    marginTop: hp(5),
    color: Colors.Black,
  },
  RatingContainer: {flexDirection: 'row', alignItems: 'center'},
  Rating: {
    fontSize: fs(14),
    width: wp(100),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    color: Colors.Grey,
  },
  RatingCount: {
    fontSize: fs(14),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    color: Colors.Grey,
  },
  ProductDetailsText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: fs(14),
    marginTop: hp(5),
    color: Colors.Black,
  },
  DescText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: fs(12),
    marginTop: hp(5),
    color: Colors.Black,
  },
  CartBuy: {flexDirection: 'row', marginVertical: hp(14)},
  BackIcon: {fontSize: fs(25)},
  DealoftheDay: {
    flexDirection: 'row',
    // marginTop: hp(40),
    // borderWidth: 1,
    backgroundColor: Colors.DeliveryOneHour,
    paddingVertical: hp(11),
    paddingHorizontal: wp(26),
    borderRadius: 8,
  },
  DOD1: {
    width: wp(234),
  },
  DODText1: {
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(8),
  },
  DODText2: {
    color: Colors.Black,
    fontSize: fs(21),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    // marginBottom: hp(8),
  },
  ViewSimilar: {
    flexDirection: 'row',
    width: wp(164),
    height: hp(48),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 8,
    paddingVertical: hp(16),
    paddingHorizontal: wp(16),
    // justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  ViewSimilarContainor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(16),
  },
  ViewSimilarText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: fs(14),
    marginLeft: hp(8),
    color: Colors.Black,
  },
  SimilarToText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(20),
    marginLeft: hp(8),
    color: Colors.Black,
    marginTop: hp(20),
    // marginBottom: hp(12),
  },
  SimilarToItemsView: {
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(19),
  },
  SimilarToItemsText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(20),
    marginLeft: hp(8),
    color: Colors.Black,
    marginTop: hp(9),
    marginBottom: hp(12),
  },
  Features: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderWidth: 1,
    marginBottom: hp(10),
  },
  AllFeaturedView: {
    width: wp(192),
  },
  Sort: {
    width: wp(61),
    height: hp(24),
    marginRight: wp(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 6,
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fs(12),
  },
  Filter: {
    width: wp(67),
    height: hp(24),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 6,
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fs(12),
  },
  AllFeatured: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(20),
    color: Colors.Black,
  },
  ProductList: {
    marginHorizontal: wp(-12),
  },
  GocartView: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: hp(50),
  },
  carticon: {
    height: hp(40),
    width: wp(40),
    borderRadius: 20,
    backgroundColor: Colors.GoToCart,
    // borderWidth: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartbox: {
    width: wp(110),
    height: hp(36),
    backgroundColor: Colors.GoToCart,
    right: wp(10),
    borderTopRightRadius: wp(4),
    borderBottomRightRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gotocartText: {
    color: Colors.white,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(16),
  },
});

export default ProductDetails;
