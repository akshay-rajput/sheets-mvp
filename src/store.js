import { configureStore } from '@reduxjs/toolkit'
import sheetReducer from './features/Home/homeSlice';

export const store = configureStore({
  reducer: {
      sheetData: sheetReducer,
    //   cart: cartReducer,
  },
});