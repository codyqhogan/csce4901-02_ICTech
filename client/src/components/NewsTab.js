import {
  Text, Pressable, View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import lstyles, {
  pawGreen, pawPink, pawGrey,
} from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';

export default function NewsTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <Pressable style={styles.newsTab}>
      <Text style={styles.newsHeader}>Breaking News!</Text>

      <View
        style={{
          borderBottomColor: isDarkMode === 'light' ? pawGreen : pawPink,
          borderBottomWidth: 3,
          borderRadius: 50,
          marginBottom: 15,
        }}
      />

      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', width: 'auto', paddingRight: 20,
      }}
      >
        <Text style={styles.eventText} numberOfLines={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo conquat. Duiaute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text>

        <Feather
          name="arrow-right-circle"
          size={30}
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={{ alignSelf: 'center' }}
        />
      </View>
    </Pressable>
  );
}
