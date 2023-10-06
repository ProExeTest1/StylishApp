import * as React from 'react';
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
import {TextInput} from 'react-native-gesture-handler';
import {Images} from '../helpers/images';
import {FeatureType} from '../helpers/appData';
import {Products} from '../helpers/interface';
import {useNavigation} from '@react-navigation/native';

interface FeaturesComponentProps {
  Data?: Array<Products>;
}

const FeaturesComponent = (props: FeaturesComponentProps) => {
  const navigation = useNavigation();

  const handlePress = category => {
    navigation.navigate('ProductsScreen', {category: category});
  };

  const renderItem = ({item}: {item: Products}) => {
    return (
      <Pressable
        style={styles.renderItemContainer}
        onPress={() => handlePress(item.category)}>
        <Image source={{uri: item.image}} style={styles.FeaturesImage} />
        <Text style={styles.FeatureText}>
          {item.category[0].toUpperCase() + item.category.slice(1)}
        </Text>
      </Pressable>
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
    // width: '100%',
    // justifyContent: 'space-between',
  },
  FeaturesImage: {
    height: hp(56),
    width: wp(56),
    borderRadius: 50,
    borderWidth: 0.3,
  },
  FeatureText: {
    // borderWidth: 1,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: fs(10),
    marginTop: hp(2),
    width: wp(56),
  },
});
