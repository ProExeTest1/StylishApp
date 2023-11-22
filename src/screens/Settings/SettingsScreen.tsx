import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Location from '../../assets/SVGs/Location.svg';
import EditIcon from '../../assets/SVGs/EditIcon.svg';
import PlusIcon from '../../assets/SVGs/PlusIcon.svg';
import VisacardIcon from '../../assets/SVGs/VisacardIcon.svg';
import BackIcon from '../../assets/SVGs/BackIcon.svg';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import ScreenTemplate from '../../components/ScreenTemplate';
import ShoppingList from '../../components/ShoppingList';
import {AddressCards, Products} from '../../helpers/interface';
import {setAddresses, setAddresses2, setMainAddress} from '../../Store/Reducer';
import firestore from '@react-native-firebase/firestore';
import ReactNativeModal from 'react-native-modal';
import {Images} from '../../helpers/images';
import SettingsComponent from '../../components/SettingsComponent';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const stateData = useSelector(state => state.Reducers);

  const Back = () => {
    navigation.goBack();
  };

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{bottom: 10, left: 10, right: 10, top: 10}}
          onPress={Back}>
          <BackIcon />
        </TouchableOpacity>
        <View>
          <Text style={styles.SettingsScreenText}>Settings</Text>
        </View>
        <View style={styles.thirdele} />
      </View>

      <View style={styles.ProfileNameViewContainer}>
        <View style={styles.StaticProfilePicView}>
          <Image
            source={
              stateData.profilePhoto === ''
                ? Images.StaticProfilePic
                : {uri: stateData.profilePhoto}
            }
            style={styles.StaticProfilePic}
          />
        </View>
        <View style={styles.ProfileNameView}>
          <Text style={styles.ProfileName}>Dummy John</Text>
          <Text style={styles.ProfileEmail}>{stateData.email}</Text>
        </View>
      </View>

      <View style={styles.SettingsComponent}>
        <SettingsComponent />
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SettingsScreenText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(18),
    color: Colors.Black,
  },
  StaticProfilePic: {
    height: hp(70),
    width: wp(70),
  },
  ProfileNameViewContainer: {
    flexDirection: 'row',
    marginTop: hp(15),
  },
  StaticProfilePicView: {
    height: hp(70),
    width: wp(70),
    borderRadius: 40,
    overflow: 'hidden',
  },
  ProfileNameView: {
    marginLeft: wp(17),
  },
  ProfileName: {
    color: Colors.Black,
    fontSize: fs(18),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  ProfileEmail: {
    color: Colors.Grey,
    fontSize: fs(14),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  SettingsComponent: {
    marginTop: hp(20),
  },
  thirdele: {
    width: wp(30),
  },
});

export default SettingsScreen;
