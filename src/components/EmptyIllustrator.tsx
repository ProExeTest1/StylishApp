import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {hp, wp} from '../helpers/ResponsiveFonts';
import {Images} from '../helpers/images';

interface EmptyIllustratorProps {}

const EmptyIllustrator = (props: EmptyIllustratorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.EmptyBoxIllustratorView}>
        <Image
          source={Images.EmptyBoxIllustrator}
          style={styles.EmptyBoxIllustrator}
        />
      </View>
    </View>
  );
};

export default EmptyIllustrator;

const styles = StyleSheet.create({
  container: {},
  EmptyBoxIllustrator: {
    height: hp(100),
    width: wp(100),
  },
  EmptyBoxIllustratorView: {
    height: hp(500),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
