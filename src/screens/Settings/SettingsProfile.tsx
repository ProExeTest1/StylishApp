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
import {
  setAccHolderName,
  setAddresses,
  setAddresses2,
  setBankAccNo,
  setEmailRedux,
  setIFSC,
  setMainAddress,
  setPasswordRedux,
} from '../../Store/Reducer';
import firestore from '@react-native-firebase/firestore';
import ReactNativeModal from 'react-native-modal';
import {Images} from '../../helpers/images';
import SettingsComponent from '../../components/SettingsComponent';
import SettingsTextInput from '../../components/SettingsTextInput';

const SettingsProfile = () => {
  const navigation = useNavigation();
  const stateData = useSelector(state => state.Reducers);
  const dispatch = useDispatch();

  const Back = () => {
    navigation.goBack();
  };

  const handleSavebutton = () => {
    let emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordregex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let bankregex = /^[0-9]{9,18}$/;

    let IFSCRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (stateData.email.match(emailregex)) {
      if (stateData.password.match(passwordregex)) {
        if (stateData.bankAccNo.match(bankregex)) {
          if (stateData.accHolderName != '') {
            if (stateData.IFSC.match(IFSCRegex)) {
            } else {
              Alert.alert('Invalid IFSC Code');
            }
          } else {
            Alert.alert(`Invalid Account Holder's Name`);
          }
        } else {
          Alert.alert('Invalid Bank Account Number');
        }
      } else {
        Alert.alert('Invalid Password!');
      }
    } else {
      Alert.alert('Invalid Email');
    }
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
          <Text style={styles.SettingsProfileText}>Settings</Text>
        </View>
        <View style={styles.thirdele} />
      </View>

      <View style={styles.ProfileNameViewContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.StaticProfilePicView}>
            <Image
              source={Images.StaticProfilePic}
              style={styles.StaticProfilePic}
            />
          </View>
          <TouchableOpacity style={styles.penTouch}>
            <Image source={Images.pen} style={styles.pen} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollView}>
        <View style={styles.SettingsComponent}>
          <Text style={styles.settingHeader}>Personal Details</Text>
          <SettingsTextInput
            title="Email Address"
            placeholder="Enter Email Address"
            value={stateData.email}
            onChangeText={text => {
              dispatch(setEmailRedux(text));
            }}
          />
          <SettingsTextInput
            title="Password"
            placeholder="Enter Password"
            secureTextEntry={true}
            value={stateData.password}
            onChangeText={text => {
              dispatch(setPasswordRedux(text));
            }}
          />
          <Text style={styles.chnagepasstext}>Change Password</Text>
          <View style={styles.HRLine} />
          {/* <Text style={styles.settingHeader}>Business Address Details</Text>
          <SettingsTextInput title="Pincode" placeholder="Enter Pincode" />
          <SettingsTextInput title="Address" placeholder="Enter Address" />
          <SettingsTextInput title="City" placeholder="Enter City Name" />
          <SettingsTextInput title="State" placeholder="Enter State Name" />
          <SettingsTextInput title="Country" placeholder="Enter Country Name" />
          <View style={styles.HRLine} /> */}
          <Text style={styles.settingHeader}>Bank Account Details</Text>
          <SettingsTextInput
            title="Bank Account Number"
            placeholder="Enter Bank Account Number"
            value={stateData.bankAccNo}
            onChangeText={text => {
              dispatch(setBankAccNo(text));
            }}
          />
          <SettingsTextInput
            title="Account Holder’s Name"
            placeholder="Enter Account Holder's Name"
            value={stateData.accHolderName}
            onChangeText={text => {
              dispatch(setAccHolderName(text));
            }}
          />
          <SettingsTextInput
            title="IFSC Code"
            placeholder="Enter IFSC Code"
            value={stateData.IFSC}
            onChangeText={text => {
              dispatch(setIFSC(text));
            }}
          />
          <TouchableOpacity
            style={styles.savebutton}
            onPress={handleSavebutton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SettingsProfileText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(18),
    color: Colors.Black,
  },
  StaticProfilePic: {
    height: '100%',
    width: '100%',
  },
  ProfileNameViewContainer: {
    flexDirection: 'row',
    marginTop: hp(31),
    justifyContent: 'center',
  },
  StaticProfilePicView: {
    height: hp(96),
    width: wp(96),
    borderRadius: 50,
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
  pen: {
    height: hp(30),
    width: wp(30),
  },
  penTouch: {
    alignSelf: 'flex-end',
    right: wp(25),
  },
  thirdele: {
    width: wp(30),
  },
  settingHeader: {
    color: Colors.Black,
    fontSize: fs(18),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(20),
  },
  chnagepasstext: {
    color: Colors.Red,
    fontSize: fs(12),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    bottom: hp(10),
  },
  HRLine: {
    borderWidth: 0.5,
    borderColor: Colors.LightGrey,
    marginVertical: hp(35),
  },
  ScrollView: {
    // paddingBottom: hp(50),
    flexGrow: 1,
  },
  savebutton: {
    paddingVertical: hp(14),
    paddingHorizontal: wp(32),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ForgetPass,
    borderRadius: 8,
    marginBottom: hp(200),
  },
  saveText: {
    color: Colors.white,
    fontSize: fs(15),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
});

export default SettingsProfile;
