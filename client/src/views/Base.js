import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import NavBar from '../components/NavBar';
import Onboarding from './Onboarding';
import Loader from './Loader';
import LocationLoader from './LocationLoader';

const QuicksandBold = require('../../assets/fonts/Quicksand-Bold.ttf');
const QuicksandLight = require('../../assets/fonts/Quicksand-Light.ttf');
const QuicksandMedium = require('../../assets/fonts/Quicksand-Medium.ttf');
const QuicksandRegular = require('../../assets/fonts/Quicksand-Regular.ttf');
const QuicksandSemiBold = require('../../assets/fonts/Quicksand-SemiBold.ttf');

export default function Base() {
  const [viewedOnboard, setViewedOnboard] = useState(false);
  const [loginToken, setLoginToken] = useState(null);
  const [fetchingToken, setFetchingToken] = useState(true);
  useSelector((state) => state.settings.reloadNeeded);
  const [status, requestPermission] = Location.useForegroundPermissions();

  LocationLoader({ status, requestPermission });

  const [loaded] = useFonts({
    QuicksandBold,
    QuicksandLight,
    QuicksandMedium,
    QuicksandRegular,
    QuicksandSemiBold,
  });

  if (!loginToken && viewedOnboard) setViewedOnboard(false);

  AsyncStorage.getItem('@loginToken').then((token) => {
    setFetchingToken(false);
    setLoginToken(token);
    if (token) setViewedOnboard(true);
  });

  if (!loaded) {
    return null;
  }

  return (
    <Loader show={fetchingToken}>
      {loginToken && viewedOnboard
        ? <NavBar />
        : <Onboarding setViewedOnboard={setViewedOnboard} />}
    </Loader>
  );
}
