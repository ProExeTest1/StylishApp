import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reducers from './Reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, Reducers);

export const store = configureStore({
  reducer: {
    Reducers: persistedReducer,
  },
});
export const persistor = persistStore(store);
