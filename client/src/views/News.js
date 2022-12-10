import {
  View, Dimensions, ScrollView, Animated, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import lstyles, {
  pawGreen, pawPink, pawWhite,
} from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow } from '../constants/DarkStyles';
import EventTab from '../components/EventTab';
import NewsComponent from '../components/NewsTab';

export default function NewsTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  const scrollX = new Animated.Value(0);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (

    <View style={styles.background}>

      <View style={styles.statusBar} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: Platform.OS === 'android' ? 68 : 68, marginTop: 30 }}
      >

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentInset={{ left: 50, right: 50 }}
          snapToAlignment="center"
          snapToInterval={Dimensions.get('window').width}
          disableIntervalMomentum
          decelerationRate="fast"
          directionalLockEnabled
          pagingEnabled
          scrollEventThrottle={14}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          style={{
            width: Dimensions.get('window').width, paddingBottom: 20,
          }}
        >
          <EventTab />
          <EventTab />
          <EventTab />
        </Animated.ScrollView>

        <View style={{
          borderWidth: 2,
          borderColor: isDarkMode === 'light' ? pawGreen : pawWhite,
          borderRadius: 10,
          padding: 5,
          width: 115,
          alignSelf: 'center',
        }}
        >
          <RNAnimatedScrollIndicators
            numberOfCards={3}
            scrollWidth={Dimensions.get('window').width}
            activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
            inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
            scrollAnimatedValue={scrollX}
            style={{

            }}
          />
        </View>

        <NewsComponent />
        <NewsComponent />
        <NewsComponent />
        <NewsComponent />
      </ScrollView>
    </View>
  );
}
