import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface SettingStackProps {}

const SettingStack = (props: SettingStackProps) => {
  return (
    <View style={styles.container}>
      <Text>SettingStack</Text>
    </View>
  );
};

export default SettingStack;

const styles = StyleSheet.create({
  container: {},
});
