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

interface HomeStackProps {}

const HomeStack = (props: HomeStackProps) => {
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
    </ScreenTemplate>
  );
};

export default HomeStack;

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
  },
  AllFeatured: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(20),
    color: Colors.Black,
  },
});
