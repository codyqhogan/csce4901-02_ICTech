import {
  View, Text, ScrollView, Pressable, Image, Dimensions, Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import lstyles, {
  pawGreen, pawPink, pawGrey, pawWhite,
} from '../constants/Styles';
import dstyles, {
  pawYellow,
} from '../constants/DarkStyles';
import PawPostComment from './PawPostComment';
import ProfileClick from './ProfileClick';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function PawPostPost() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [isPicVisible, setPicVisible] = useState(false);
  const togglePic = () => {
    setPicVisible(!isPicVisible);
  };

  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (
    <View>
      <Pressable style={[styles.picContainer, { height: 400 }]} onPress={togglePic}>
        <Image
          style={styles.picImage}
          source={miso}
        />
        <View
          style={styles.picBottomBand}
        />
        <Pressable>
          <Feather
            name="heart"
            size={24}
            color={isDarkMode === 'light' ? pawYellow : pawPink}
            style={styles.likeLoc1}
          />

        </Pressable>
        <Pressable style={styles.ppProfileNameNode} onPress={toggleProfile}>
          <Text style={styles.picHeader2}>@user-name</Text>
        </Pressable>
        <Pressable style={styles.ppProfileImageHolder} onPress={toggleProfile}>
          <Image
            style={styles.ppProfileImage}
            source={miso}
          />
        </Pressable>
        <Text style={[styles.picDescription, { left: 2, top: 220 }]}>Descriptive Text</Text>
        <View
          style={{
            borderBottomColor: isDarkMode === 'light' ? pawGreen : pawPink,
            borderBottomWidth: 1,
            borderRadius: 50,
            top: 270,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
        <Text style={[styles.picTag, { left: 2, top: 265 }]}>Tags</Text>
      </Pressable>

      <Modal
        isVisible={isPicVisible}
        onBackdropPress={() => isPicVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.picsModal}
      >
        <View>
          <Image
            style={styles.inspicImage}
            source={miso}
          />
          <View
            style={styles.inspicBottomBand}
          />
          <View style={styles.inspicContainer} />
          <Pressable>
            <Feather
              name="heart"
              size={24}
              color={isDarkMode === 'light' ? pawYellow : pawPink}
              style={styles.likeLoc2}
            />
          </Pressable>
          <Pressable style={styles.insppProfileNameNode} onPress={toggleProfile}>
            <Text style={styles.picHeader2}>@user-name</Text>
          </Pressable>
          <Pressable
            style={styles.insppProfileImageHolder}
            onPress={toggleProfile}
          >
            <Image
              style={styles.ppProfileImage}
              source={miso}
            />
          </Pressable>
          <Text style={[styles.inspicDescription, { left: -8, top: (Dimensions.get('window').width - 80) }]}>Descriptive Text</Text>
          <View
            style={{
              borderBottomColor: isDarkMode === 'light' ? pawGreen : pawPink,
              borderBottomWidth: 1,
              borderRadius: 50,
              top: (Dimensions.get('window').width - 35),
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
          <Text style={[styles.inspicTag, { left: -8, top: (Dimensions.get('window').width - 37.5) }]}>Tags</Text>
          <Pressable
            onPress={togglePic}
            style={{ alignSelf: 'flex-start', zIndex: 45, top: -120 }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={styles.exitPicButton}
            />

          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 72, marginBottom: 100 }}>
          <View
            style={{
              borderColor: isDarkMode === 'light' ? pawGreen : pawWhite,
              backgroundColor: isDarkMode === 'light' ? pawGreen : pawWhite,
              borderRadius: 50,
              width: 6,
              height: Platform.OS === 'android' ? (Dimensions.get('window').width - 90) : (Dimensions.get('window').width - 125),
              marginTop: Dimensions.get('window').width,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
          <ScrollView style={{ marginTop: Dimensions.get('window').width - 70 }}>

            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />

          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={isProfileVisible}
        onBackdropPress={() => isProfileVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.oProfModal}
      >
        <Pressable
          onPress={toggleProfile}
          style={{
            alignSelf: 'flex-start',
            position: 'absolute',
            margin: 10,
            zIndex: 50,
            marginTop: Platform.OS === 'android' ? 38 : 56,
          }}
        >
          <Feather
            name="chevron-left"
            size={30}
            color={isDarkMode === 'light' ? pawYellow : pawWhite}
            style={styles.exitProfButton}
          />
        </Pressable>
        <ProfileClick />
      </Modal>
    </View>
  );
}
