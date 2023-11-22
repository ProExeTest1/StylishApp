import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// import SwiperFlatList from 'react-native-swiper-flatlist';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {ProductImagesType} from '../helpers/appData';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';
import RightArrow from '../assets/SVGs/RightArrow.svg';
import {useNavigation} from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Images} from '../helpers/images';

interface ProductImagesProps {
  Data?: Array<ProductImagesType>;
}

const ProductImages = (props: ProductImagesProps) => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(1);
  const [index, setIndex] = useState(0);
  const [swipeIcon, setSwipeIcon] = useState(Images.RightArrow);
  const flatListRef = useRef<SwiperFlatList>(null);

  const handleDOD = category => {
    HideBottomTab();
    navigation.navigate('ProductsScreen', {category: category});
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

  const ShoppingSwipe = () => {
    if (index < props.Data?.length) {
      setIndex(index + 1);
      if (index + 1 >= props.Data?.length) setSwipeIcon(Images.LeftArrow);
      flatListRef?.current?.scrollToIndex({index: index});
    } else {
      setIndex(1);
      setSwipeIcon(Images.RightArrow);
      flatListRef?.current?.scrollToIndex({index: 0});
    }
  };

  const renderItem = ({item}) => {
    console.log('Item -- ', item);

    return (
      <View style={styles.RenderItem}>
        <ImageBackground
          source={{uri: item}}
          style={styles.Image}
          resizeMode="contain">
          <View style={styles.DiscountTextView}>
            {/* <Pressable
              style={styles.ViewAll}
              onPress={() => handleDOD(item.category)}>
              <Text style={styles.ViewAllText}>Shop Now</Text>
              <RightArrow />
            </Pressable> */}
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SwiperFlatList
        // autoplay
        autoplayLoop
        autoplayDelay={5}
        data={props.Data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        // contentContainerStyle={styles.FlatListStyle}
        horizontal
        showPagination
        paginationStyle={styles.paginationStyle}
        paginationActiveColor={Colors.Red}
        paginationStyleItem={styles.paginationStyleItem}
        bounces={false}
        ref={flatListRef}
      />
      <TouchableOpacity style={styles.Button} onPress={ShoppingSwipe}>
        {/* <Text>{swipeIcon}</Text> */}
        <Image source={swipeIcon} style={styles.swipeIconStyle} />
      </TouchableOpacity>
      {/* <Carousel
        data={props.Data}
        renderItem={renderItem}
        sliderWidth={hp(500)}
        itemWidth={hp(500)}
        loop
        autoplay
        autoplayInterval={1000}
        onSnapToItem={() => {}}
        style={{backgroundColor: 'yellow'}}
      />
      <Pagination
        dotsLength={props.Data.length}
        activeDotIndex={activeSlide}
        containerStyle={{}}
        inactiveDotColor={Colors.ProductImagesPagination}
        dotStyle={styles.paginationStyle}
      /> */}
    </View>
  );
};

export default ProductImages;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  RenderItem: {},
  Image: {
    height: hp(189),
    width: wp(313),
    marginRight: wp(10),
    marginLeft: wp(10),
    // borderWidth: 1,
  },
  paginationStyle: {
    // height: 10,
    // width: 10,
    // borderWidth: 1,
    // marginTop: 12,
    bottom: hp(-38),
  },
  paginationStyleItem: {
    height: hp(10),
    width: wp(10),
    marginHorizontal: wp(2),
  },
  DiscountTextView: {
    marginTop: hp(45),
    marginLeft: wp(20),
  },
  DiscountText: {
    color: Colors.white,
    fontSize: fs(20),
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(8),
  },
  NormalText: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(4),
  },
  ViewAll: {
    borderWidth: 1,
    height: fs(32),
    paddingHorizontal: wp(10),
    paddingVertical: hp(6),
    borderRadius: 4,
    borderColor: Colors.white,
    marginTop: hp(12),
    // marginLeft: wp(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(100),
  },
  ViewAllText: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
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
  swipeIconStyle: {
    height: hp(14),
    width: wp(14),
  },
});
