/* eslint-disable global-require */
// Required imports
import React from 'react';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import NavBar from '../components/NavBar';

export default function App() {
  const [loaded] = useFonts({
    QuicksandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuicksandLight: require('../../assets/fonts/Quicksand-Light.ttf'),
    QuicksandMedium: require('../../assets/fonts/Quicksand-Medium.ttf'),
    QuicksandRegular: require('../../assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavBar />
  );
}

registerRootComponent(App);
