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

const miso = require('../../assets/petPhotos/miso.jpg');
const bowser = require('../../assets/petPhotos/bowser.jpg');
const cookie = require('../../assets/petPhotos/cookie.jpg');
const eve = require('../../assets/petPhotos/eve.jpg');
const ginger = require('../../assets/petPhotos/ginger.jpg');
const luna = require('../../assets/petPhotos/luna.jpg');
const mugen = require('../../assets/petPhotos/mugen.jpg');
const suki = require('../../assets/petPhotos/suki.jpg');
const stark = require('../../assets/petPhotos/stark.jpg');
const fury = require('../../assets/petPhotos/fury.jpg');

function RandomPic() {
  const maxNumber = 10;
  const randomNumber = Math.floor((Math.random() * maxNumber) + 1);

  if (randomNumber === 1) {
    return miso;
  }

  if (randomNumber === 2) {
    return bowser;
  }

  if (randomNumber === 3) {
    return cookie;
  }

  if (randomNumber === 4) {
    return eve;
  }

  if (randomNumber === 5) {
    return ginger;
  }

  if (randomNumber === 6) {
    return luna;
  }

  if (randomNumber === 7) {
    return mugen;
  }

  if (randomNumber === 8) {
    return suki;
  }

  if (randomNumber === 9) {
    return stark;
  }

  if (randomNumber === 10) {
    return fury;
  }
}

export default function ProfilePhotoCard() {
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

  return (
    <View style={styles.photoingrid}>
      <Pressable onPress={togglePic}>
        <Image
          style={styles.photoingrid}
          source={RandomPic()}
        />
      </Pressable>

      {/* </DropShadow> */}
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
          <Pressable style={styles.insppProfileNameNode}>
            <Text style={styles.inspicHeader2}>@user-name</Text>
          </Pressable>
          <Image
            style={styles.insppProfileImage}
            source={miso}
          />
          <Text style={[styles.inspicDescription, { left: -8, top: (Dimensions.get('window').width - 20) }]}>Descriptive Text</Text>
          <View
            style={{
              borderBottomColor: isDarkMode === 'light' ? pawGreen : pawPink,
              borderBottomWidth: 1,
              borderRadius: 50,
              top: (Dimensions.get('window').width + 20),
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
          <Text style={[styles.inspicTag, { left: -8, top: (Dimensions.get('window').width + 15) }]}>Tags</Text>
          <Pressable
            onPress={togglePic}
            style={{ alignSelf: 'flex-start', zIndex: 45, top: -60 }}
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
          <ScrollView style={{ marginTop: Dimensions.get('window').width - 10 }}>

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
    </View>
  );
}
