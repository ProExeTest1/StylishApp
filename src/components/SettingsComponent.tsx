import React from 'react';
import {Text, View, StyleSheet, FlatList, Pressable} from 'react-native';
import {SettingsData, SettingsDataType} from '../helpers/appData';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Righticon from '../assets/SVGs/Righticon.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

interface SettingsComponentProps {}

const SettingsComponent = (props: SettingsComponentProps) => {
  const navigation = useNavigation();

  const GotoScreen = (text: string) => {
    navigation.navigate(text);
  };

  const renderItem = ({item}: {item: SettingsDataType}) => {
    return (
      <Pressable
        style={[styles.renderItem]}
        onPress={() => GotoScreen(item.screenname)}>
        <View style={styles.titledescriptionview}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity>
          <Righticon />
        </TouchableOpacity>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={SettingsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={SettingsData}
      />
    </View>
  );
};

export default SettingsComponent;

const styles = StyleSheet.create({
  container: {},
  renderItem: {
    // borderBottomWidth: 0.3,

    elevation: 2,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 2,

    backgroundColor: Colors.white,
    // margin: 10,
    // borderColor: '#000',
    // borderWidth: 1,
    height: hp(72),

    // paddingVertical: hp(18),
    // paddingHorizontal: wp(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: fs(16),
    color: Colors.Black,
    marginBottom: hp(9),
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: fs(11),
    color: Colors.Grey,
  },
  titledescriptionview: {},
});
