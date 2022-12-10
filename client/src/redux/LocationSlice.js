/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    loaded: false,
  },
  reducers: {
    setLocation: (state, action) => {
      state.region.latitude = action.payload.coords.latitude;
      state.region.longitude = action.payload.coords.longitude;
      state.region.latitudeDelta = 0.2;
      state.region.longitudeDelta = 0.2;
      state.loaded = true;
    },
    resetLocation: (state) => {
      state.loaded = false;
    },
  },

});

export const { setLocation, resetLocation } = locationSlice.actions;

export default locationSlice.reducer;
