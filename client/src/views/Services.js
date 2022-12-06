import {
  View, ScrollView, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBarServ';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import ServNode from '../components/ServiceNode';
import ServNode1 from '../components/ServiceNode1';
import ServNode2 from '../components/ServiceNode2';
import ServNode3 from '../components/ServiceNode3';
import ServNode4 from '../components/ServiceNode4';
import ServNode5 from '../components/ServiceNode5';

export default function ServicesTab() {
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
          style={{ marginBottom: Platform.OS === 'android' ? 170 : 190 }}
        >
          <ServNode />
          <ServNode1 />
          <ServNode2 />
          <ServNode3 />
          <ServNode4 />
          <ServNode5 />
        </ScrollView>
      </View>
    </View>
  );
}
