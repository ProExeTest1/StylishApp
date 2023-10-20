import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface SettingsTextInputProps {
  title?: string;
  onChangeText?: ((text: string) => void) | undefined;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
}

const SettingsTextInput = (props: SettingsTextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={styles.TextInput}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        value={props.value}
      />
    </View>
  );
};

export default SettingsTextInput;

const styles = StyleSheet.create({
  container: {},
  TextInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: hp(14),
    paddingHorizontal: wp(14),
    color: Colors.Black,
    marginBottom: hp(28),
  },
  title: {
    color: Colors.Black,
    fontSize: fs(12),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(15),
  },
});
