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
import Search from '../assets/SVGs/Search.svg';
import Mic from '../assets/SVGs/Mic.svg';
import {Images} from '../helpers/images';
import {FeatureType, ShoppingCardType} from '../helpers/appData';
import {Products} from '../helpers/interface';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import HeartIconBlack from '../assets/SVGs/WishlistIcons/HeartIconBlack.svg';
import HeartIconFilled from '../assets/SVGs/WishlistIcons/HeartIconFilled.svg';
import {setProducts} from '../Store/Reducer';

interface TrendingProductsCardProps {
  Data?: Array<Products>;
}

const TrendingProductsCard = (props: TrendingProductsCardProps) => {
  const [index, setIndex] = useState(2);
  const [swipeIcon, setSwipeIcon] = useState('>');
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const [hearts, setHearts] = useState([]);

  const ShoppingSwipe = () => {
    if (index < props.Data?.filter((item, index) => index < 4)?.length) {
      setIndex(index + 2);
      if (index + 2 >= props.Data?.filter((item, index) => index < 4)?.length)
        setSwipeIcon('<');
      flatListRef?.current?.scrollToIndex({index: index});
    } else {
      setIndex(2);
      setSwipeIcon('>');
      flatListRef?.current?.scrollToIndex({index: 0});
    }
  };
  const ProductDetails = (item: Products) => {
    navigation.navigate('ProductDetails', {item});
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
  };
  const renderItem = ({item}: {item: Products}) => {
    return (
      <Pressable
        style={styles.renderItemContainer}
        onPress={() => ProductDetails(item)}>
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
          source={{uri: item.image}}
          style={styles.TrendingProductsCardImage}
          resizeMode="contain"
        />
        <Text style={styles.TitleText}>{item.title}</Text>
        {/* <Text style={styles.DescText}>{item.Desc}</Text> */}
        <Text style={styles.PriceText}>${item.price}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={styles.MRPText}>₹{item.MRP}</Text> */}
          {/* <Text style={styles.DiscountText}>{item.Discount}%Off</Text> */}
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.Rating}>⭐⭐⭐⭐⭐</Text>
          <Text style={[styles.Rating, {fontSize: fs(14)}]}>
            {' '}
            {item.NoOfRatings}
          </Text>
        </View> */}
      </Pressable>
    );
  };

  useEffect(() => {
    const tempArray = stateData.products
      ?.filter(ele => ele.fav === true)
      .map(ele => ele.id);

    setHearts(tempArray);
  }, [stateData.products]);

  return (
    <View style={styles.container}>
      <FlatList
        data={props.Data?.filter((item, index) => index < 4)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.FlatListStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
      />
      <TouchableOpacity style={styles.Button} onPress={ShoppingSwipe}>
        <Text>{swipeIcon}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrendingProductsCard;

const styles = StyleSheet.create({
  container: {},
  FlatListStyle: {
    backgroundColor: Colors.white,

    // width: 200,
  },
  renderItemContainer: {
    marginRight: wp(12),
  },
  TrendingProductsCardImage: {
    height: hp(128),
    width: wp(145),
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
    fontWeight: '400',
    fontSize: fs(12),
    marginTop: hp(5),
    color: Colors.Black,
    width: wp(134),
  },
  DescText: {
    width: wp(162),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '400',
    fontSize: fs(10),
    // marginTop: hp(2),
    color: Colors.Black,
  },
  PriceText: {
    width: wp(66),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
    fontWeight: '500',
    fontSize: fs(12),
    marginTop: hp(5),
    color: Colors.Black,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
});
