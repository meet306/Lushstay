import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './propertiesSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
});