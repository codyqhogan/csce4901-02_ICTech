/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// Required imports
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View, TouchableOpacity, Dimensions, Animated, Pressable, Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
// Component imports
import MapTab from '../views/Map';
import ServicesTab from '../views/Services';
import NewsTab from '../views/News';
import CommunityTab from '../views/Community';
import HealthTab from '../views/Health';
import SettingsPage from '../views/Settings';
import AccountPage from '../views/Account';
import PawPics from '../views/PawPics';
import PawPosts from '../views/PawPosts';
import PMs from '../views/PMs';
import lstyles, { pawGrey } from '../constants/Styles';
import dstyles, { pawYellow } from '../constants/DarkStyles';

function MyTabBar({
  state, descriptors, navigation,
}) {
  const [styles, setStyles] = useState(lstyles);
  // eslint-disable-next-line no-shadow
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [translateX] = useState(new Animated.Value(0));
  const [commPopupVisible, makeCommPopupVisible] = useState(false);
  const [healthPopupVisible, makeHealthPopupVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('N');

  const translateTab = (index) => {
    if (index > 4 && index < 7) {
      index = 4;
    } else if (index > 6) {
      index = 3;
    }
    Animated.spring(translateX, {
      toValue: index * (Dimensions.get('window').width / 5) + index,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);
  return (
    <View style={styles.tabBarContainer}>
      <Animated.View
        style={[styles.circleAnimated, { transform: [{ translateX }] }]}
      >
        <View style={styles.circle} />
        <View style={styles.circle2} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const optionsLabel = options.tabBarLabel || options.title;
        const label = optionsLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
            setCurrentScreen(route.name);
          } else if (isFocused && route.name === 'C') {
            makeCommPopupVisible(true);
          } else if (isFocused && route.name === 'H') {
            makeHealthPopupVisible(true);
          }
        };

        const onLongPress = () => {
          onPress();
          if (route.name === 'M') {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          } else if (route.name === 'S') {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          } else if (route.name === 'N') {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          } else if (route.name === 'C') {
            makeCommPopupVisible(true);
          } else if (route.name === 'H') {
            makeHealthPopupVisible(true);
          }
        };
        let buttonRaise = 0;
        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            onFocus={(currentScreen === label) ? (buttonRaise = (Platform.OS === 'ios' ? 22 : 20)) : buttonRaise = 0}
            style={{ flex: 1, alignItems: 'center', bottom: buttonRaise }}
            hitSlop={{
              top: 20, bottom: 20, left: 20, right: 20,
            }}
          >
            <Feather
              name={
                {
                  N: isFocused ? 'book-open' : 'book',
                  M: 'map-pin',
                  S: 'compass',
                  C: 'users',
                  H: 'activity',
                }[label] || 'home'
              }
              size={
                currentScreen === label ? 50 : 30
              }
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ justifyContent: 'center' }}
            />
          </TouchableOpacity>
        );
      })}
      <View style={styles.modalView1}>
        <Modal
          animationType="fade"
          transparent
          visible={commPopupVisible}
          onBackdropPress={() => {
            makeCommPopupVisible(!commPopupVisible);
          }}
          onRequestClose={() => {
            makeCommPopupVisible(!commPopupVisible);
          }}
        >
          <Pressable
            style={styles.pawPupPic}
            onPress={() => {
              makeCommPopupVisible(!commPopupVisible);
              navigation.navigate('PawPics');
            }}
          >
            <Feather
              name="image"
              size={20}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupPost}
            onPress={() => {
              makeCommPopupVisible(!commPopupVisible);
              navigation.navigate('PawPosts');
            }}
          >
            <Feather
              name="file-text"
              size={20}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupPM}
            onPress={() => {
              makeCommPopupVisible(!commPopupVisible);
              navigation.navigate('PMs');
            }}
          >
            <Feather
              name="message-square"
              size={20}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
        </Modal>
        <Modal
          animationType="fade"
          transparent
          visible={healthPopupVisible}
          onBackdropPress={() => {
            makeHealthPopupVisible(!healthPopupVisible);
          }}
          onRequestClose={() => {
            makeHealthPopupVisible(!healthPopupVisible);
          }}
        >
          <Pressable
            style={styles.pawPupHealth}
            onPress={() => {
              makeHealthPopupVisible(!healthPopupVisible);
              navigation.navigate('H');
            }}
          >
            <Feather
              name="heart"
              size={20}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupAccount}
            onPress={() => {
              makeHealthPopupVisible(!healthPopupVisible);
              navigation.navigate('AccountPage');
            }}
          >
            <Feather
              name="user"
              size={20}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
          <Pressable
            style={styles.pawPupSettings}
            onPress={() => {
              makeHealthPopupVisible(!healthPopupVisible);
              navigation.navigate('SettingsPage');
            }}
          >
            <Feather
              name="settings"
              size={20}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={{ justifyContent: 'center' }}
            />
          </Pressable>
        </Modal>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="N"
      screenOptions={{ headerShown: false }}
      // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
      tabBar={(props) => <MyTabBar {...props} state={{ ...props.state, routes: props.state.routes.slice(0, 5) }} />}
    >
      <Tab.Screen name="M" component={MapTab} />
      <Tab.Screen name="S" component={ServicesTab} />
      <Tab.Screen name="N" component={NewsTab} />
      <Tab.Screen name="C" component={CommunityTab} />
      <Tab.Screen name="H" component={HealthTab} />
      <Tab.Screen name="SettingsPage" component={SettingsPage} />
      <Tab.Screen name="AccountPage" component={AccountPage} />
      <Tab.Screen name="PawPics" component={PawPics} />
      <Tab.Screen name="PawPosts" component={PawPosts} />
      <Tab.Screen name="PMs" component={PMs} />
    </Tab.Navigator>
  );
}

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
