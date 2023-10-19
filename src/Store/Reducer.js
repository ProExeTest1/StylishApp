import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Products} from '../helpers/Products';

const reducerSlice = createSlice({
  name: 'reducers',
  initialState: {
    products: Products.products,
    cartarray: [],
    addresses: [],
    // mainAddress: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCartArray(state, action) {
      state.cartarray = action.payload;
    },
    setAddresses2(state, action) {
      state.addresses = [];
    },
    setAddresses(state, action) {
      if (action?.payload?.isNew) {
        console.log('action?.payload?.id', action?.payload);
        state.addresses = [...state.addresses, action?.payload?.data];
      } else {
        const temp = state?.addresses?.map(item => {
          console.log('item dsdfehgfdafgh 222', item);
          if (item?.id == action?.payload?.data?.id) {
            return action?.payload?.data;
          } else {
            return item;
          }
        });
        state.addresses = temp;
      }
    },
  },
});

export const {setProducts} = reducerSlice.actions;
export const {setCartArray} = reducerSlice.actions;
export const {setAddresses} = reducerSlice.actions;
export const {setAddresses2} = reducerSlice.actions;

export default reducerSlice.reducer;
