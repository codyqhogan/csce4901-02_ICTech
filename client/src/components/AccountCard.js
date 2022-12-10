import {
  Text, Pressable, Image, View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function AccountCard() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <View style={styles.transparentBG}>
      <Pressable style={styles.accountCard}>
        <Image
          style={styles.accountImage}
          source={miso}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={styles.accountHeader}
          >
            Miso
          </Text>
          <Pressable>
            <Feather
              name="x-circle"
              size={30}
              color="indianred"
              style={{ alignSelf: 'center', paddingLeft: 10, paddingTop: 10 }}
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}
