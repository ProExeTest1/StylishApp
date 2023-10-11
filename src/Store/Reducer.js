import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const reducerSlice = createSlice({
  name: 'reducers',
  initialState: {
    products: [],
    cartarray: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCartArray(state, action) {
      state.cartarray = action.payload;
    },
  },
});

export const {setProducts} = reducerSlice.actions;
export const {setCartArray} = reducerSlice.actions;

export default reducerSlice.reducer;
