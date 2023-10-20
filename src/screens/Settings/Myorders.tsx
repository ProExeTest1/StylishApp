import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface MyordersProps {}

const Myorders = (props: MyordersProps) => {
  return (
    <View style={styles.container}>
      <Text>Myorders</Text>
    </View>
  );
};

export default Myorders;

const styles = StyleSheet.create({
  container: {},
});
