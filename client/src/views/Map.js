import {
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from '../components/SearchBarServ';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import lightMap from '../constants/lightMap.json';
import darkMap from '../constants/darkMap.json';
import Loader from './Loader';

const StatusBarHeight = getStatusBarHeight();

export default function MapTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const initialLocation = useSelector((state) => state.location.region);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (
    <View>
      <View style={styles.statusBar} />
      <Loader show={initialLocation.loaded}>
        <View style={styles.containerMap}>
          <View>
            <MapView
              style={styles.map}
              customMapStyle={isDarkMode === 'light' ? darkMap : lightMap}
              provider="google"
              showsUserLocation
              followsUserLocation
              region={initialLocation}
              initialRegion={initialLocation}
            />
          </View>
        </View>
        <View style={[styles.search, { position: 'absolute', top: StatusBarHeight }]}>
          <SearchBar />
        </View>
      </Loader>
    </View>
  );
}
