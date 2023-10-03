import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';
import Search from '../assets/SVGs/Search.svg';
import Mic from '../assets/SVGs/Mic.svg';
import {TextInput} from 'react-native-gesture-handler';

interface SearchComponentProps {}

const SearchComponent = (props: SearchComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.Search}>
        <Search />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          placeholder="Search any Product.."
          placeholderTextColor={Colors.LightGrey}
        />
      </View>
      <TouchableOpacity style={styles.Mic}>
        <Mic />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    height: hp(40),
    width: wp(343),
    backgroundColor: Colors.white,
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 6,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Search: {
    width: '10%',
  },
  TextInput: {
    width: '70%',
    // borderWidth: 1,
    color: Colors.Black,
  },
  Mic: {
    width: '20%',
    alignItems: 'flex-end',
  },
});
