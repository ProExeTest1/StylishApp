import React from 'react';
import {StyleSheet} from 'react-native';
import {AppProps} from './helpers/interface';
import MainNavigation from './navigation/MainNavigation';
import {Provider} from 'react-redux';
import {store, persistor} from './Store/Store';
import {PersistGate} from 'redux-persist/integration/react';

const App = (props: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
