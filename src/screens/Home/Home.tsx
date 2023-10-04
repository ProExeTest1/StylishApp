import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import ScreenTemplate from '../../components/ScreenTemplate';
import DrawerIcon from '../../assets/SVGs/DrawerIcon.svg';
import StylishLogo from '../../assets/SVGs/StylishLogo.svg';
import ProfilePic from '../../assets/SVGs/ProfilePic.svg';
import SearchComponent from '../../components/SearchComponent';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import FilterIcon from '../../assets/SVGs/FilterIcon.svg';
import SortIcon from '../../assets/SVGs/SortIcon.svg';
import FeaturesComponent from '../../components/FeaturesComponent';
import {
  AdsCardsData,
  FearuresData,
  ShoppingCardData,
  TrendingProductsData,
} from '../../helpers/appData';
import AdsCard from '../../components/AdsCard';
import RightArrow from '../../assets/SVGs/RightArrow.svg';
import ShoppingCard from '../../components/ShoppingCard';
import SpecialOfferImage from '../../assets/SVGs/SpecialOfferImage.svg';
import Heels from '../../assets/SVGs/HeelsImage/Heels.svg';
import Rectangle from '../../assets/SVGs/HeelsImage/Rectangle.svg';
import GroupStars from '../../assets/SVGs/HeelsImage/GroupStars.svg';
import TrendingProductsCard from '../../components/TrendingProductsCard';
import HotSummerSale from '../../assets/SVGs/HotSummerSale.svg';
import Sponsered from '../../assets/SVGs/Sponsered.svg';

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <ScreenTemplate>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.DrawerIcon}>
          <DrawerIcon />
        </TouchableOpacity>
        <View style={styles.StylishLogo}>
          <StylishLogo />
        </View>
        <View style={styles.ProfilePic}>
          <ProfilePic />
        </View>
      </View>
      <View style={styles.SearchComponent}>
        <SearchComponent />
      </View>
      <View style={styles.Features}>
        <View style={styles.AllFeaturedView}>
          <Text style={styles.AllFeatured}>All Featured</Text>
        </View>
        <Pressable style={styles.Sort}>
          <Text>Sort</Text>
          <SortIcon />
        </Pressable>
        <Pressable style={styles.Filter}>
          <Text>Filter</Text>
          <FilterIcon />
        </Pressable>
      </View>
      <View style={styles.FeaturesComponent}>
        <FeaturesComponent Data={FearuresData} />
      </View>
      <View style={styles.Adscard}>
        <AdsCard Data={AdsCardsData} />
      </View>
      <View style={styles.DealoftheDay}>
        <View style={styles.DOD1}>
          <Text style={styles.DODText1}>Deal of the Day</Text>
          <Text style={styles.DODText2}>🕒 22h 55m 20s remaining</Text>
        </View>
        <Pressable style={styles.ViewAll}>
          <Text style={styles.ViewAllText}>View all</Text>
          <RightArrow />
        </Pressable>
      </View>
      <View style={styles.FeaturesComponent}>
        <ShoppingCard Data={ShoppingCardData} />
      </View>

      <View style={styles.SpecialOfferView}>
        <Pressable style={styles.SpecialOfferImage}>
          <SpecialOfferImage />
        </Pressable>
        <View style={styles.DOD1}>
          <Text style={styles.SOText1}>
            Special Offers <Text style={styles.SOemoji}>😱</Text>
          </Text>
          <Text style={styles.SOText2}>
            We make sure you get the offer you need at best prices
          </Text>
        </View>
      </View>

      <View style={[styles.SpecialOfferView]}>
        <View style={styles.HeelsImage}>
          <View>
            <Rectangle />
          </View>
          <View style={styles.GroupStars}>
            <GroupStars />
          </View>
          <View style={styles.Heels}>
            <Heels />
          </View>
        </View>
        <View style={styles.HeelsView}>
          <Text style={styles.HeelsText1}>Flat and Heels</Text>
          <Text style={styles.HeelsText2}>Stand a chance to get rewarded</Text>
          <Pressable style={styles.Visitnow}>
            <Text style={styles.VisitnowText}>Visit now</Text>
            <RightArrow />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.DealoftheDay,
          {backgroundColor: Colors.TrendyProducts, marginTop: hp(16)},
        ]}>
        <View style={styles.DOD1}>
          <Text style={styles.DODText1}>Trending Products</Text>
          <Text style={styles.DODText2}>🗓️ Last Date 29/02/22</Text>
        </View>
        <Pressable style={styles.ViewAll}>
          <Text style={styles.ViewAllText}>View all</Text>
          <RightArrow />
        </Pressable>
      </View>

      <View style={styles.FeaturesComponent}>
        <TrendingProductsCard Data={TrendingProductsData} />
      </View>

      <View style={styles.HotSummerSale}>
        <HotSummerSale />
        <View style={styles.NewArrivals}>
          <View style={styles.DOD1}>
            <Text
              style={[
                styles.DODText1,
                {fontSize: fs(20), color: Colors.Black, marginBottom: hp(4)},
              ]}>
              New Arrivals
            </Text>
            <Text
              style={[
                styles.DODText2,
                {fontSize: fs(16), color: Colors.Black},
              ]}>
              Summer’ 25 Collections
            </Text>
          </View>
          <Pressable
            style={[
              styles.ViewAll,
              {
                right: wp(25),
                backgroundColor: Colors.Visitnow,
                borderColor: Colors.Visitnow,
              },
            ]}>
            <Text style={styles.ViewAllText}>View all</Text>
            <RightArrow />
          </Pressable>
        </View>
      </View>

      <View style={styles.sponserdView}>
        <Text style={styles.sponserdText}>Sponserd</Text>
        <Sponsered />
        <View style={styles.FiftyOffView}>
          <Text style={styles.FiftyOff}>up to 50% Off</Text>
          <Text style={[styles.FiftyOff, {width: 'auto'}]}>{'>'}</Text>
        </View>
      </View>

      {/* <View style={styles.DealoftheDay}>
        <View style={styles.DOD1}>
          <Text style={styles.DODText1}>Deal of the Day</Text>
          <Text style={styles.DODText2}>🕒 22h 55m 20s remaining</Text>
        </View>
        <Pressable style={styles.ViewAll}>
          <Text style={styles.ViewAllText}>View all</Text>
          <RightArrow />
        </Pressable>
      </View> */}
    </ScreenTemplate>
  );
};

export default Home;

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DrawerIcon: {width: '20%'},
  StylishLogo: {width: '60%', alignItems: 'center'},
  ProfilePic: {width: '20%', alignItems: 'flex-end'},
  SearchComponent: {
    alignItems: 'center',
    paddingVertical: hp(16),
  },
  Features: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  AllFeaturedView: {
    width: wp(192),
  },
  Sort: {
    width: wp(61),
    marginRight: wp(12),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
  FeaturesComponent: {
    marginTop: hp(17),
    paddingVertical: hp(8),
    paddingLeft: wp(8),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  Adscard: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    height: hp(189),
    marginTop: hp(16),
  },
  DealoftheDay: {
    flexDirection: 'row',
    marginTop: hp(40),
    // borderWidth: 1,
    backgroundColor: Colors.DealofthDay,
    paddingVertical: hp(8),
    paddingHorizontal: wp(8),
    borderRadius: 8,
  },
  DOD1: {
    width: wp(234),
  },
  DODText1: {
    color: Colors.white,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(8),
  },
  DODText2: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    // marginBottom: hp(8),
  },
  ViewAll: {
    borderWidth: 1,
    height: fs(32),
    paddingHorizontal: wp(10),
    paddingVertical: hp(6),
    borderRadius: 4,
    borderColor: Colors.white,
    marginTop: hp(8),
    marginLeft: wp(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  SpecialOfferView: {
    flexDirection: 'row',
    marginTop: hp(16),
    // borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: hp(12),
    paddingHorizontal: wp(8),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 6,
  },
  SpecialOfferImage: {
    marginRight: wp(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  SOText1: {
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    // borderWidth: 1,
  },
  SOText2: {
    color: Colors.Black,
    fontSize: fs(12),
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    width: wp(171),
    marginTop: hp(8),
  },
  SOemoji: {
    borderWidth: 1,
    marginLeft: 10,
  },
  HeelsImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GroupStars: {
    right: wp(10),
    // borderWidth: 1,
  },
  Heels: {
    right: wp(70),
    // borderWidth: 1,
  },
  HeelsText1: {
    right: wp(50),
    top: hp(50),
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    width: wp(150),
  },
  HeelsText2: {
    right: wp(50),
    top: hp(50),
    color: Colors.Black,
    fontSize: fs(10),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
  VisitnowText: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  Visitnow: {
    borderWidth: 1,
    height: hp(24),
    width: wp(92),
    // paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 4,
    borderColor: Colors.Visitnow,
    backgroundColor: Colors.Visitnow,
    // marginTop: hp(8),
    // marginLeft: wp(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: wp(0),
    top: hp(60),
  },
  HotSummerSale: {
    marginTop: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  NewArrivals: {
    flexDirection: 'row',
    width: wp(343),
    // marginTop: hp(40),
    // borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: hp(8),
    paddingHorizontal: wp(8),
    // borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sponserdView: {
    paddingHorizontal: wp(16),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: wp(343),
    alignSelf: 'center',
    marginVertical: hp(24),
    overflow: 'scroll',
  },
  sponserdText: {
    color: Colors.Black,
    fontSize: fs(20),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(12),
  },
  FiftyOff: {
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
    marginVertical: hp(12),
    width: wp(200),
    // borderWidth: 1,
  },
  FiftyOffView: {
    flexDirection: 'row',
    // borderWidth: 1,
    width: wp(327),
    justifyContent: 'space-between',
  },
});
