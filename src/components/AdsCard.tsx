import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
// import SwiperFlatList from 'react-native-swiper-flatlist';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {AdsCardsData, AdsCardsType} from '../helpers/appData';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';
import RightArrow from '../assets/SVGs/RightArrow.svg';
import {useNavigation} from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';

interface AdsCardProps {
  Data?: Array<AdsCardsType>;
}

const AdsCard = (props: AdsCardProps) => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);

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

  const renderItem = ({item}: {item: AdsCardsType}) => {
    return (
      <View style={styles.RenderItem}>
        <ImageBackground source={item.Image} style={styles.Image}>
          <View style={styles.DiscountTextView}>
            <Text style={styles.DiscountText}>50-40% OFF</Text>
            <Text style={styles.NormalText}>Now in {item.category}</Text>
            <Text style={styles.NormalText}>All colours</Text>
            <Pressable
              style={styles.ViewAll}
              onPress={() => handleDOD(item.category)}>
              <Text style={styles.ViewAllText}>Shop Now</Text>
              <RightArrow />
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayLoop
        data={props.Data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.FlatListStyle}
        horizontal
        showPagination
        paginationStyle={styles.paginationStyle}
        paginationActiveColor={Colors.AdsCardPagination}
        paginationStyleItem={styles.paginationStyleItem}
        bounces={false}
      />
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
        inactiveDotColor={Colors.AdsCardPagination}
        dotStyle={styles.paginationStyle}
      /> */}
    </View>
  );
};

export default AdsCard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  RenderItem: {},
  Image: {
    height: hp(189),
    width: wp(343),
    marginRight: wp(10),
    marginLeft: wp(10),
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
});
