import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const reducerSlice = createSlice({
  name: 'reducers',
  initialState: {
    products: [],
    cartarray: [],
    // addresses: [],
    // mainAddress: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCartArray(state, action) {
      state.cartarray = action.payload;
    },
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
    setMainAddress(state, action) {
      state.mainAddress = action.payload;
    },
  },
});

export const {setProducts} = reducerSlice.actions;
export const {setCartArray} = reducerSlice.actions;
export const {setAddresses} = reducerSlice.actions;
export const {setMainAddress} = reducerSlice.actions;

export default reducerSlice.reducer;
