import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';
import Search from '../assets/SVGs/Search.svg';
import Mic from '../assets/SVGs/Mic.svg';
import {Images} from '../helpers/images';
import {FeatureType, ShoppingCardType} from '../helpers/appData';

interface TrendingProductsCardProps {
  Data?: Array<ShoppingCardType>;
}

const TrendingProductsCard = (props: TrendingProductsCardProps) => {
  const [index, setIndex] = useState(2);
  const flatListRef = useRef<FlatList>(null);

  const ShoppingSwipe = () => {
    if (index < props?.Data?.length) {
      setIndex(index + 2);
      flatListRef?.current?.scrollToIndex({index: index});
    } else {
      setIndex(2);
      flatListRef?.current?.scrollToIndex({index: 0});
    }
  };

  const renderItem = ({item}: {item: ShoppingCardType}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Image source={item.Image} style={styles.TrendingProductsCardImage} />
        <Text style={styles.TitleText}>{item.Title}</Text>
        {/* <Text style={styles.DescText}>{item.Desc}</Text> */}
        <Text style={styles.PriceText}>₹{item.Price}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.MRPText}>₹{item.MRP}</Text>
          <Text style={styles.DiscountText}>{item.Discount}%Off</Text>
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.Rating}>⭐⭐⭐⭐⭐</Text>
          <Text style={[styles.Rating, {fontSize: fs(14)}]}>
            {' '}
            {item.NoOfRatings}
          </Text>
        </View> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.Data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.FlatListStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
      />
      <TouchableOpacity style={styles.Button} onPress={ShoppingSwipe}>
        <Text>{'>'}</Text>
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
    marginTop: hp(2),
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
    // marginTop: hp(2),
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
});
