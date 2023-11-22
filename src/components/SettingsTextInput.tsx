import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PasswordEye from '../assets/SVGs/PasswordEye.svg';
import PasswordEyeHide from '../assets/SVGs/PasswordEyeHide.svg';
import {SettingsTextInputProps} from '../helpers/interface';

const SettingsTextInput = (props: SettingsTextInputProps) => {
  const [eye, setEye] = useState(false);

  const handleEyeIcon = () => {
    setEye(!eye);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View
        style={
          props.PasswordIcon
            ? [
                styles.TextInputContainer,
                {borderWidth: 1, borderRadius: 8, paddingRight: wp(8)},
              ]
            : styles.TextInputContainer
        }>
        <TextInput
          style={
            props.PasswordIcon
              ? [styles.TextInput, {width: '80%', borderWidth: 0}]
              : styles.TextInput
          }
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          secureTextEntry={eye}
          value={props.value}
          editable={props.editable}
        />
        {props.PasswordIcon ? (
          eye ? (
            <TouchableOpacity onPress={handleEyeIcon}>
              <PasswordEye width={wp(24)} height={hp(24)} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleEyeIcon}>
              <PasswordEyeHide width={wp(24)} height={hp(24)} />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
  );
};

export default SettingsTextInput;

const styles = StyleSheet.create({
  container: {},
  TextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
    marginBottom: hp(28),
    justifyContent: 'space-between',
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: hp(14),
    paddingHorizontal: wp(14),
    color: Colors.Black,
    width: '100%',
  },
  title: {
    color: Colors.Black,
    fontSize: fs(12),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(15),
  },
});
