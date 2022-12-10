import {
  View, ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBarServ';
import lstyles, { } from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import PawPicsPost from '../components/PawPicsPost';

export default function PawPics() {
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
      <View style={styles.containerMap}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 170 }}
        >
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
        </ScrollView>
      </View>
    </View>
  );
}
