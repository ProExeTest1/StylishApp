import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';
import HeartIconBlack from '../assets/SVGs/WishlistIcons/HeartIconBlack.svg';
import HeartIconFilled from '../assets/SVGs/WishlistIcons/HeartIconFilled.svg';
import Mic from '../assets/SVGs/Mic.svg';
import {Images} from '../helpers/images';
import {FeatureType, ShoppingListType} from '../helpers/appData';
import Carousel from 'react-native-snap-carousel';
import {Products} from '../helpers/interface';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setCartArray, setProducts} from '../Store/Reducer';

interface ShoppingListProps {
  Data?: Array<Products>;
}

const ShoppingList = (props: ShoppingListProps) => {
  const [index, setIndex] = useState(2);
  const [hearts, setHearts] = useState([]);
  const flatListRef = useRef<FlatList>(null);
  const [fav, setFav] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);

  const ShoppingBag = (item: Products) => {
    HideBottomTab();
    navigation.navigate('ShoppingBag', {item});
  };
  const HideBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  };
  const HeartSelection = (item: Products) => {
    let updatedProducts = stateData.products.map((ele: Products) => {
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

    let currentProducts = [...updatedProducts];
    let currentCartarray = [...stateData.cartarray];
    console.log('currentProducts----------', currentProducts);
    console.log('currentCartarray----------', currentCartarray);

    let resultArray = currentProducts.filter(ele1 =>
      currentCartarray.find(ele2 => ele2.id === ele1.id),
    );

    console.log('resultArray-------------', resultArray);

    dispatch(setCartArray(resultArray));
    console.log(
      'updatedProducts in Products List ------------------------- ',
      updatedProducts,
    );
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

  const CloseIconHandle = (item: Products) => {
    const dataArray = stateData.cartarray.filter(ele => ele.id != item.id);
    dispatch(setCartArray(dataArray));
  };

  const renderItem = ({item}: {item: Products}) => {
    return (
      <Pressable style={styles.mainContainer} onPress={() => ShoppingBag(item)}>
        <View style={styles.renderItemContainer}>
          <View style={styles.ProductImage}>
            <TouchableOpacity
              style={styles.HeartSelection}
              onPress={() => HeartSelection(item)}>
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
            <View style={styles.closeIconView}>
              <Text style={styles.TitleText}>
                {item.title.substring(0, 20)}...
              </Text>
              <Pressable onPress={() => CloseIconHandle(item)}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </Pressable>
            </View>

            <Text style={styles.DescText}>
              {item.description.substring(0, 70)}...
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Text style={styles.MRPText}>₹{item.MRP}</Text> */}
              {/* <Text style={styles.DiscountText}>{item.Discount}%Off</Text> */}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.Rating}>⭐⭐⭐⭐⭐</Text>
              <Text style={[styles.Rating, {fontSize: fs(14)}]}>
                {' '}
                {item.ratingcount}
              </Text>
            </View>
            <Text style={styles.PriceText}>${item.price}</Text>
          </View>
        </View>
        <View style={styles.hrLine}></View>
        <View style={styles.TotalOrderView}>
          <Text style={styles.TotalOrderText}>Total Order (1) :</Text>
          <Text style={styles.TotalOrderPriceText}>${item.price}</Text>
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
        // numColumns={2}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        bounces={false}
      />
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {},
  FlatListStyle: {
    backgroundColor: Colors.white,

    // width: 200,
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
  ShoppingListImage: {
    height: hp(167),
    width: wp(170),
    // borderWidth: 1,
  },
  FeatureText: {
    // borderWidth: 1,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: fs(10),
    marginTop: hp(2),
  },
  TitleText: {
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '500',
    fontSize: fs(17),
    marginTop: hp(5),
    color: Colors.Black,
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
  MRPText: {
    width: wp(41),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '300',
    fontSize: fs(12),
    // marginTop: hp(2),
    color: Colors.Grey,
    textDecorationLine: 'line-through',
    // flexDirection: 'row',
  },
  DiscountText: {
    textDecorationLine: 'none',
    color: Colors.Red,
    width: wp(42),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '400',
    fontSize: fs(10),
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
  Button: {
    height: hp(40),
    width: wp(40),
    backgroundColor: Colors.ShoppingSwipe,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginVertical: wp(100),
    right: wp(10),
  },
  HeartSelection: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
  },
  ProductDetails: {
    marginLeft: wp(15),
    // borderWidth: 1,
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
  closeIcon: {
    height: hp(15),
    width: wp(15),
  },
  closeIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
