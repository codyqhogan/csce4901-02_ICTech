import {
  Text, View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

export default function MessageSent() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <View style={styles.messageSent}>
      <Text style={styles.messageContents}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </View>
  );
}
