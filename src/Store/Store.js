import {configureStore} from '@reduxjs/toolkit';
import Reducers from './Reducer';

export const store = configureStore({
  reducer: {
    Reducers: Reducers,
  },
});
