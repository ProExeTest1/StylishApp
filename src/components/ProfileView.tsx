import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../helpers/images';
import {hp, wp} from '../helpers/ResponsiveFonts';
import {useNavigation} from '@react-navigation/native';

interface ProfileViewProps {}

const ProfileView = (props: ProfileViewProps) => {
  const stateData = useSelector(state => state.Reducers);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const ProfileScreen = () => {
    navigation.navigate('SettingsScreen');
  };

  return (
    <TouchableHighlight style={styles.container} onPress={ProfileScreen}>
      <Image
        source={
          stateData.profilePhoto === ''
            ? Images.StaticProfilePic
            : {uri: stateData.profilePhoto}
        }
        style={styles.StaticProfilePic}
      />
    </TouchableHighlight>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    height: hp(40),
    width: wp(40),
    borderRadius: 50,
    overflow: 'hidden',
  },
  StaticProfilePic: {
    height: '100%',
    width: '100%',
  },
});
