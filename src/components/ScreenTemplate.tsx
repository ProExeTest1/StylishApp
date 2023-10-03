import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {Colors} from '../helpers/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {ReactNode} from 'react';
import {hp, wp} from '../helpers/ResponsiveFonts';
import {ScreenTemplateProps} from '../helpers/interface';

const ScreenTemplate = (props: ScreenTemplateProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <StatusBar
          translucent={true}
          backgroundColor={Colors.Background}
          barStyle={'dark-content'}
        />
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  ScrollView: {
    flexGrow: 1,
    paddingVertical: hp(16),
    paddingHorizontal: wp(16),
  },
});
