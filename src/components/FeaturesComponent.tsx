import * as React from 'react';
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
import {TextInput} from 'react-native-gesture-handler';
import {Images} from '../helpers/images';
import {FeatureType} from '../helpers/appData';

interface FeaturesComponentProps {
  Data?: Array<FeatureType>;
}

const FeaturesComponent = (props: FeaturesComponentProps) => {
  const renderItem = ({item}: {item: FeatureType}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Image source={Images.FeaturesImage} style={styles.FeaturesImage} />
        <Text style={styles.FeatureText}>{item.feature}</Text>
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
      />
    </View>
  );
};

export default FeaturesComponent;

const styles = StyleSheet.create({
  container: {},
  FlatListStyle: {
    backgroundColor: Colors.white,

    // width: 200,
  },
  renderItemContainer: {
    marginHorizontal: wp(8),
  },
  FeaturesImage: {
    height: hp(56),
    width: wp(56),
  },
  FeatureText: {
    // borderWidth: 1,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: fs(10),
    marginTop: hp(2),
  },
});
