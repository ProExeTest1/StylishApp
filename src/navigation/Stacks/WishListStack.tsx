import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface WishListStackProps {}

const WishListStack = (props: WishListStackProps) => {
  return (
    <View style={styles.container}>
      <Text>WishListStack</Text>
    </View>
  );
};

export default WishListStack;

const styles = StyleSheet.create({
  container: {},
});
