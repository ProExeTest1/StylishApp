import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  LogBox,
} from 'react-native';
import {Colors} from '../helpers/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {ReactNode} from 'react';
import {hp, wp} from '../helpers/ResponsiveFonts';
import {ScreenTemplateProps} from '../helpers/interface';

const ScreenTemplate = (props: ScreenTemplateProps) => {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <View style={styles.View}>
        {/* <Text>kkkk</Text> */}
        {props.children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  View: {
    flexGrow: 1,
    paddingVertical: hp(16),
    paddingHorizontal: wp(16),
  },
});
