import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface ShoppingCartStackProps {}

const ShoppingCartStack = (props: ShoppingCartStackProps) => {
  return (
    <View style={styles.container}>
      <Text>ShoppingCartStack</Text>
    </View>
  );
};

export default ShoppingCartStack;

const styles = StyleSheet.create({
  container: {},
});
