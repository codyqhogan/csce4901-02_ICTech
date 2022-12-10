/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, Image, Dimensions,
} from 'react-native';
import styles from '../constants/Styles';

export default function OnboardingItem({ item }) {
  return (
    <View style={{
      width: Dimensions.get('window').width, flex: 1, justifyContent: 'center', alignItems: 'center',
    }}
    >
      <Image source={item.image} style={[styles.onboardingImage, { width: Dimensions.get('window').width, resizeMode: 'contain' }]} />
      <View style={{ flex: 0.7 }}>
        <Text style={styles.onboardingTitle}>{item.title}</Text>
        <Text style={styles.onboardingDes}>{item.description}</Text>
      </View>
    </View>
  );
}
