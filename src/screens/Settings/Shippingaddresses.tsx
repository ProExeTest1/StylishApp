import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface ShippingaddressesProps {}

const Shippingaddresses = (props: ShippingaddressesProps) => {
  return (
    <View style={styles.container}>
      <Text>Shippingaddresses</Text>
    </View>
  );
};

export default Shippingaddresses;

const styles = StyleSheet.create({
  container: {},
});
