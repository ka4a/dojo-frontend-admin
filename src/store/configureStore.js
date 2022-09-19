import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export default function initializeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
