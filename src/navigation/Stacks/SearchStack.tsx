import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface SearchStackProps {}

const SearchStack = (props: SearchStackProps) => {
  return (
    <View style={styles.container}>
      <Text>SearchStack</Text>
    </View>
  );
};

export default SearchStack;

const styles = StyleSheet.create({
  container: {},
});
