import { configureStore } from '@reduxjs/toolkit'
import sheetReducer from './features/Table/tableSlice';

export const store = configureStore({
  reducer: {
      sheetData: sheetReducer,
    //   cart: cartReducer,
  },
});