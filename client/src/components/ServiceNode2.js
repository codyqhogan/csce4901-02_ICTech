import {
  View, Text, Pressable, Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import lstyles, { pawGreen, pawPink, pawGrey } from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';

const miso = require('../../assets/servImages/JarettsvilleVet.jpg');

export default function ServNode() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (
    <View>
      <Pressable style={[styles.servContainer, { height: 125 }]}>
        <View
          style={styles.servLeft}
        >
          <Image
            style={styles.servImage}
            source={miso}
          />
          <View
            style={styles.servCheck}
          >
            <Feather
              name="check"
              size={24}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ alignSelf: 'center' }}
            />

          </View>
        </View>
        <Text style={styles.servHeader}>Jarettsville Vet</Text>
        <Text style={styles.servHeader2}>Veterinary Clinic</Text>
        <Feather
          name="star"
          size={20}
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={styles.servStar1}
        />
        <Feather
          name="star"
          size={20}
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={styles.servStar2}
        />
        <Feather
          name="star"
          size={20}
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={styles.servStar3}
        />
        <Feather
          name="star"
          size={20}
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={styles.servStar4}
        />
        <Feather
          name="star"
          size={20}
          color={isDarkMode === 'light' ? pawYellow : pawGrey}
          style={styles.servStar5}
        />
        <View
          style={{
            borderBottomColor: isDarkMode === 'light' ? pawGreen : pawPink,
            borderBottomWidth: 3,
            borderRadius: 50,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 100,
            marginRight: 10,
          }}
        />
        <Text style={styles.servHeader2}>
          Our clinic was founded over 80 years ago and excels in the science of veterinary medicine
          and delivers compassionate, quality veterinary care.
        </Text>
      </Pressable>

      {/* </DropShadow> */}
    </View>
  );
}
