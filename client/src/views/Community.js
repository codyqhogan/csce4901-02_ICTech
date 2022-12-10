import {
  View, Image, TextInput, Switch, Pressable, Text, ScrollView, Animated, Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import lstyles, { pawWhite, pawGreen, pawPink } from '../constants/Styles';
import dstyles, {
  pawYellow, pawLightGrey, pawGrey,
} from '../constants/DarkStyles';
import ProfilePhotoCard from '../components/ProfilePhotoCard';
import ProfilePostCard from '../components/ProfilePostCard';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function CommunityTab(bioUpdate) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const scrollX = new Animated.Value(0);

  const [VisisEnabled, VissetIsEnabled] = useState(false);
  const visSwitch = () => VissetIsEnabled((previousState) => !previousState);

  const [isFSVisible, setFSVisible] = useState(false);
  const toggleForumSettings = () => {
    setFSVisible(!isFSVisible);
  };

  const [isEBVisible, setEBVisible] = useState(false);
  const toggleEditBio = () => {
    setEBVisible(!isEBVisible);
  };

  return (
    <View style={styles.background}>
      <View style={styles.statusBar} />
      <Image
        style={styles.oProfileImage}
        source={miso}
      />
      <Pressable
        onPress={toggleForumSettings}
        style={{
          alignSelf: 'flex-start', position: 'absolute', top: 60, left: 10,
        }}
      >
        <Feather
          name="settings"
          size={30}
          color={isDarkMode === 'light' ? pawYellow : pawWhite}
          style={styles.exitProfButton}
        />

      </Pressable>
      <View style={styles.oProfileBio}>
        <Text style={styles.oProfBioText} numberOfLines={6}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.

        </Text>
      </View>
      <View style={styles.oProfileName}>
        <Text style={styles.oProfNameText}>@user-name</Text>
      </View>
      <View
        style={styles.profBottomBand}
      />
      <View style={styles.scrollIndicatorProfile}>
        <RNAnimatedScrollIndicators
          numberOfCards={2}
          scrollWidth={Dimensions.get('window').width}
          activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
          inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
          scrollAnimatedValue={scrollX}
        />
      </View>
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
          height: 220,
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: Dimensions.get('window').width, left: -12, marginBottom: 75, paddingBottom: 60,
          }}
        >
          <View style={styles.photoGrid}>
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
            <ProfilePhotoCard />
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: Dimensions.get('window').width, left: -10, marginBottom: 75, paddingBottom: 60,
          }}
        >
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
          <ProfilePostCard />
        </ScrollView>
      </Animated.ScrollView>
      <Modal
        isVisible={isEBVisible}
        onBackdropPress={() => isEBVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.editBioModal}
      >
        <View styles={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Previous Bio"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            value={bioUpdate}
          />
        </View>
        <Pressable
          onPress={toggleEditBio}
          style={{
            alignSelf: 'flex-start', position: 'absolute', bottom: 25, left: 25,
          }}
        >
          <Feather
            name="x"
            size={30}
            color={pawGrey}
            style={styles.settingsExitButton}
          />

        </Pressable>
        <Pressable
          onPress={toggleEditBio}
          style={{
            alignSelf: 'flex-start', position: 'absolute', bottom: 25, right: 25,
          }}
        >
          <Feather
            name="check"
            size={30}
            color={pawGrey}
            style={styles.settingsExitButton}
          />

        </Pressable>
      </Modal>
      <Modal
        isVisible={isFSVisible}
        onBackdropPress={() => isFSVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.settingsModal}
      >
        <View style={styles.settingsModal}>
          <Pressable
            onPress={toggleForumSettings}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={pawGrey}
              style={styles.settingsExitButton}
            />

          </Pressable>

          <View>
            <Feather
              name="archive"
              size={100}
              color={pawGrey}
              style={styles.settingsIcon}
            />
          </View>
          <Pressable onPress={toggleEditBio} style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Edit Bio
            </Text>
            <Feather
              name="edit-2"
              size={30}
              color={(isDarkMode === 'light' ? pawGreen : pawGrey)}
              style={{ marginRight: -5 }}
            />
          </Pressable>
          <View style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Profile Visibility
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: isDarkMode === 'light' ? pawGreen : pawPink, true: pawGrey }}
              thumbColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
              ios_backgroundColor={isDarkMode === 'light' ? pawGreen : pawPink}
              onValueChange={visSwitch}
              value={VisisEnabled}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
