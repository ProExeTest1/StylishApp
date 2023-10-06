import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const reducerSlice = createSlice({
  name: 'reducers',
  initialState: {
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const {setProducts} = reducerSlice.actions;

export default reducerSlice.reducer;
