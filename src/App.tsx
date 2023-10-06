import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Preview from './screens/Preview/Preview';
import {AppProps} from './helpers/interface';
import MainNavigation from './navigation/MainNavigation';
import {Provider} from 'react-redux';
import {store} from './Store/Store';

const App = (props: AppProps) => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
