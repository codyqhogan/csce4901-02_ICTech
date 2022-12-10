import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './SettingsSlice';
import locationReducer from './LocationSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    location: locationReducer,
  },
});

export default store;
