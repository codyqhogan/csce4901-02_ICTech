import {
  Text, Pressable, View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

export default function PetCard() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <Pressable style={styles.healthContainer}>
      <Text style={styles.healthHeader}>Health Component</Text>
      <View
        style={styles.healthDivider}
      />
    </Pressable>
  );
}
