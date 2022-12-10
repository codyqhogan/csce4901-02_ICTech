/* eslint-disable global-require */
import {
  View, Text, Dimensions, Pressable, Image, Animated,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AwesomeAlert from 'react-native-awesome-alerts';
import lstyles, { pawPink, pawGrey, pawWhite } from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow } from '../constants/DarkStyles';
import AccountCard from '../components/AccountCard';
import { reload } from '../redux/SettingsSlice';

const miso = require('../../assets/petPhotos/miso.jpg');

const StatusBarHeight = getStatusBarHeight();

export default function AccountTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const scrollX = new Animated.Value(0);

  /* toggle profile section modal */
  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  /* toggle pet section modal */
  const [isPetsVisible, setPetsVisible] = useState(false);
  const togglePets = () => {
    setPetsVisible(!isPetsVisible);
  };

  const [loggingOut, setLoggingOut] = useState(false);
  const toggleLog = () => {
    setLoggingOut(!loggingOut);
  };

  const logOut = () => {
    toggleLog();
    setTimeout(() => {
      AsyncStorage.removeItem('@loginToken', () => dispatch(reload()));
    }, 1000);
  };

  return (
    <View style={styles.background}>

      <View style={[styles.statusBar, { marginBottom: 30 }]} />
      <View>
        <View style={styles.profileBorder}>
          <Image
            style={styles.profileImage}
            source={miso}
          />
        </View>
      </View>

      <View style={[styles.menuItem, styles.usernameField]}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.menuText, styles.usernameFont]}
        >
          UserName
        </Text>
      </View>

      <Pressable onPress={toggleProfile} style={styles.menuItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Edit Profile
        </Text>
        <Feather
          name="chevron-right"
          size={30}
          color={pawGrey}
          style={{ marginRight: -5 }}
        />

      </Pressable>

      {/* profile options modal */}
      <Modal
        isVisible={isProfileVisible}
        onSwipeComplete={() => setProfileVisible(false)}
        swipeDirection="right"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
      >
        <View>
          <Pressable
            onPress={toggleProfile}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={pawGrey}
              style={styles.exitButton}
            />

          </Pressable>

          <View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Image
                resizeMode="cover"
                style={styles.profileIcon}
                source={miso}
              />
              <Pressable>
                <Feather
                  name="camera"
                  size={30}
                  color={isDarkMode === 'light' ? pawLightGrey : pawPink}
                  style={styles.cameraIcon}
                />
              </Pressable>
            </View>
          </View>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Username
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Email
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users email
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              First Name
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Last Name
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Date of Birth
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Date
            </Text>
          </Pressable>

          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, styles.accountFields]}
            >
              Location
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Location Data
            </Text>
          </Pressable>
        </View>
      </Modal>

      <Pressable onPress={togglePets} style={styles.menuItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Edit Pets
        </Text>
        <Feather
          name="chevron-right"
          size={30}
          color={pawGrey}
          style={{ marginRight: -5 }}
        />

      </Pressable>

      {/* pets options modal */}
      <Modal
        isVisible={isPetsVisible}
        onSwipeComplete={() => setPetsVisible(false)}
        swipeDirection="right"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
      >
        <View>
          <Pressable
            onPress={togglePets}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={pawGrey}
              style={styles.exitButton}
            />

          </Pressable>

          <View>
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={Dimensions.get('window').width}
              decelerationRate="fast"
              disableIntervalMomentum
              directionalLockEnabled
              pagingEnabled
              scrollEventThrottle={14}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true },
              )}
              style={{
                width: Dimensions.get('window').width,
                height: 250,
                marginTop: (Dimensions.get('window').height - StatusBarHeight - 100) / 10,
                marginLeft: 10,
                marginBottom: 20,
              }}
            >
              <AccountCard />
              <AccountCard />
              <AccountCard />
              <AccountCard />

            </Animated.ScrollView>

            <View style={styles.scrollIndicator}>
              <RNAnimatedScrollIndicators
                numberOfCards={4}
                scrollWidth={Dimensions.get('window').width}
                activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
                inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
                scrollAnimatedValue={scrollX}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>

            <Pressable style={[styles.menuItem, { marginTop: 20, width: Dimensions.get('window').width - 40 }]}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.menuText}
              >
                Add Pet
              </Text>
              <Feather
                name="plus-circle"
                size={30}
                color="indianred"
                style={{ marginRight: -5 }}
              />
            </Pressable>

          </View>

        </View>
      </Modal>

      <Pressable
        style={styles.menuItem}
        onPress={logOut}
      >
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Sign out
        </Text>

      </Pressable>
      <AwesomeAlert
        show={loggingOut}
        showProgress
        title="See you next time!"
        progressColor="#69a297"
        progressSize="large"
        titleStyle={styles.settingsText}
      />
    </View>
  );
}
