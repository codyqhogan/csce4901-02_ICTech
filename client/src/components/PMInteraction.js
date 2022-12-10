import {
  Text, Pressable, View, Image, ScrollView, TextInput,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import lstyles, { pawGrey, pawWhite } from '../constants/Styles';
import dstyles, { pawLightGrey, pawYellow } from '../constants/DarkStyles';
import MessageSent from './MessageSent';
import MessageReceived from './MessageReceived';

const miso = require('../../assets/petPhotos/miso.jpg');

export default function PMUserInteraction(replyText) {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const [isMessageVisible, setMessageVisible] = useState(false);
  const toggleMessage = () => {
    setMessageVisible(!isMessageVisible);
  };

  const scrollViewRef = useRef();

  return (
    <View>
      <Pressable onPress={toggleMessage} style={styles.pmUserInteraction}>
        <Image
          style={styles.pmUserImage}
          source={miso}
        />
        <View style={styles.pmPreview}>
          <Text style={styles.pmUserPreview}>
            Username
          </Text>
          <Text style={styles.pmUserMessagePreview}>
            Old Message
          </Text>
        </View>
        <View style={styles.pmMessageIcons}>
          <Feather
            name="star"
            size={30}
            color={isDarkMode === 'light' ? pawYellow : pawGrey}
          />
          <Feather
            name="send"
            size={30}
            color={isDarkMode === 'light' ? pawYellow : pawGrey}
            style={{ paddingTop: 2 }}
          />
        </View>
      </Pressable>

      <Modal
        isVisible={isMessageVisible}
        onSwipeComplete={() => setMessageVisible(false)}
        swipeDirection="right"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.PMModal}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable
            onPress={toggleMessage}
            style={{ alignSelf: 'flex-start', flex: 1.5 }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={isDarkMode === 'light' ? pawYellow : pawGrey}
              style={styles.pmExitButton}
            />

          </Pressable>

          <View style={styles.messageTitle}>
            <Text style={styles.userTitle}>Username</Text>

            <Image
              style={styles.messageProfileIcon}
              source={miso}
            />
          </View>

        </View>

        <ScrollView
          contentInset={{ top: 10 }}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >

          <MessageReceived />
          <MessageSent />
          <MessageReceived />
          <MessageSent />
          <MessageSent />

        </ScrollView>

        <View style={styles.replyBar}>
          <TextInput
            style={styles.replyContents}
            placeholder="Reply here"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            multiline
            value={replyText}
          />

          <Pressable>
            <Feather
              name="send"
              size={25}
              color={isDarkMode === 'light' ? pawLightGrey : pawWhite}
              style={styles.sendButton}
            />
          </Pressable>
        </View>

      </Modal>
    </View>
  );
}
