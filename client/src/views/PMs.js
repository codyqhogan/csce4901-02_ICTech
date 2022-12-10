import {
  View, ScrollView, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBarServ';
import lstyles, { } from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import PMUserInteraction from '../components/PMInteraction';

export default function PMs() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (
    <View style={styles.background}>
      <View style={styles.statusBar} />

      <View style={styles.search}>
        <SearchBar />
      </View>

      <ScrollView
        contentInset={{ bottom: 160 }}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: Platform.OS === 'android' ? 170 : 0 }}
      >

        <PMUserInteraction />
        <PMUserInteraction />
        <PMUserInteraction />
        <PMUserInteraction />

      </ScrollView>
    </View>
  );
}
