import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {AdsCardsData, AdsCardsType} from '../helpers/appData';
import {hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';

interface AdsCardProps {
  Data?: Array<AdsCardsType>;
}

const AdsCard = (props: AdsCardProps) => {
  const renderItem = ({item}: {item: AdsCardsType}) => {
    return (
      <View style={styles.RenderItem}>
        <Image source={item.Image} style={styles.Image} />
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
        // contentContainerStyle={styles.FlatListStyle}
        horizontal
        showPagination
        paginationStyle={styles.paginationStyle}
        paginationActiveColor={Colors.AdsCardPagination}
        paginationStyleItem={styles.paginationStyleItem}
      />
    </View>
  );
};

export default AdsCard;

const styles = StyleSheet.create({
  container: {},
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
});
