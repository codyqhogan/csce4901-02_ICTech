import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Pressable,
  TextInput, Dimensions, FlatList,
  Animated, Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import base64 from 'base-64';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import slides from '../components/OnboardingSlides';
import OnboardingItem from '../components/OnboardingItem';
import lstyles, {
  pawGreen, pawPink, pawWhite,
} from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import { reload } from '../redux/SettingsSlice';
import Network from '../util/Network';

const _ = Network();

// const textInputWidth = Dimensions.get('window').width - 60;
// const maxFontSize = 26;

export default function Onboarding({ setViewedOnboard }) {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [styles, setStyles] = useState(lstyles);
  const [isSigninVisible, setSigninVisible] = useState(false);
  const [formEntry, setFormEntry] = useState({});
  const [isEmailValid, setEmailValid] = useState(false);
  const [isFNameValid, setFNameValid] = useState(false);
  const [isLNameValid, setLNameValid] = useState(false);
  const [isUNameValid, setUNameValid] = useState(false);
  const [isPassValid, setPassValid] = useState(false);
  const [isPasswordMatch, setPasswordMatch] = useState(false);
  const dispatch = useDispatch();
  let dropdownAlert = useRef();

  const scrollX = new Animated.Value(0);

  const loginUser = async () => {
    const networkResponse = await _.get('login', {
      headers: {
        Authorization: `Basic ${base64.encode(`${formEntry.username}:${formEntry.password}`)}`,
      },
    });
    networkResponse.onSuccess((response) => {
      AsyncStorage.setItem('@loginToken', response.data.token, () => {
        setViewedOnboard(true);
        dispatch(reload());
      });
    }).onClientError((response) => {
      if (response.status === 401) dropdownAlert.alertWithType('custom', 'Error', 'That username or password is invalid.');
      else dropdownAlert.alertWithType('custom', 'Error', 'An unexpected error occurred.');
    });
  };

  const registerUser = async () => {
    const networkResponse = await _.post('login', formEntry);
    networkResponse.onSuccess((response) => {
      AsyncStorage.setItem('@loginToken', response.data.token);
      setRegisterVisible(false);
      setViewedOnboard(true);
      setFormEntry({});
    }).onClientError((response) => {
      switch (response.status) {
        case 409: dropdownAlert.alertWithType('custom', 'Error', 'That username or email already exists');
          break;
        default: dropdownAlert.alertWithType('custom', 'Error', 'There was an unexpected error with your request.');
      }
    }).onServerError(() => {
      dropdownAlert.alertWithType('custom', 'Error', 'There was an unexpected server error.');
    });
  };

  const updateFormEntry = (key, value) => {
    const newFormEntry = formEntry;
    newFormEntry[key] = value;
    setFormEntry(newFormEntry);
  };

  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  /* toggle sigin section modal */
  const toggleSignin = () => {
    setSigninVisible(!isSigninVisible);
  };

  /* toggle register section modal */
  const toggleRegister = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const toggleHideConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  /* const [fontSize, setFontSize] = React.useState(maxFontSize);

  const scaleFontSize = (width) => {
    const actualWidth = width + fontSize;
    const scaledSize = Math.min(maxFontSize, fontSize * (textInputWidth / actualWidth));

    setFontSize(scaledSize);
  };

  const onContentSizeChange = ({ nativeEvent }) => {
    const { contentSize } = nativeEvent;
    const { width } = contentSize;

    scaleFontSize(width);
  }; */

  return (
    <View style={{
      flex: 1, backgroundColor: pawPink,
    }}
    >
      <View style={styles.statusBar} />
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        style={{ height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 290 : 230) }}
      />
      <RNAnimatedScrollIndicators
        numberOfCards={3}
        scrollWidth={Dimensions.get('window').width}
        activeColor={pawGreen}
        inActiveColor={pawWhite}
        scrollAnimatedValue={scrollX}
        style={{
          flex: 1,
        }}
      />

      <View style={[styles.background, { marginTop: 15 }]}>
        <View style={{
          flex: 1, justifyContent: 'center', flexDirection: 'row', alignContent: 'center', marginTop: 2,
        }}
        >

          <Pressable
            onPress={toggleSignin}
            style={styles.signinbutton}
          >
            <Text style={styles.signintext}>Sign In</Text>
          </Pressable>
          <Pressable
            onPress={toggleRegister}
            style={styles.signinbutton}
          >
            <Text style={styles.signintext}>Register</Text>
          </Pressable>

        </View>

        <Modal
          visible={isSigninVisible}
          animationType="slide"
          style={styles.signinModal}
        >
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            <Pressable
              onPress={toggleSignin}
              style={{ alignSelf: 'flex-start' }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color="#333333"
                style={styles.signinExitButton}
              />

            </Pressable>
            <View style={styles.signinHead}>
              <Text style={styles.signinPromptText}>Welcome Back!</Text>
            </View>

            <TextInput
              style={styles.signinField}
              placeholder="username"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              autoCapitalize="none"
              onChangeText={(text) => updateFormEntry('username', text)}
            />
            <View>
              <TextInput
                style={styles.signinField}
                placeholder="password"
                placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
                secureTextEntry={hidePassword}
                textAlign="center"
                onChangeText={(text) => updateFormEntry('password', text)}
              />
              <Pressable style={[styles.signinField, { position: 'absolute', width: 50, right: 20 }]} onPress={toggleHidePassword}>
                <Feather
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={30}
                  color="#333333"
                  style={{ }}
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                loginUser();
              }}
              style={[styles.signinPrompt, { marginTop: 15 }]}
            >
              <Text style={styles.signinPromptText}>Sign In</Text>
            </Pressable>
            <DropdownAlert
              ref={(ref) => {
                if (ref) {
                  dropdownAlert = ref;
                }
              }}
              containerStyle={styles.dropDownPaw5}
            />
          </KeyboardAwareScrollView>
        </Modal>

        <Modal
          visible={isRegisterVisible}
          animationType="modal"
          style={styles.signinModal}
        >
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            <Pressable
              onPress={toggleRegister}
              style={{ alignSelf: 'flex-start' }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color="#333333"
                style={[styles.signinExitButton, { marginBottom: 30 }]}
              />

            </Pressable>

            <View style={styles.signinHead}>
              <Text style={styles.signinPromptText}>Welcome to Paw5!</Text>
            </View>
            <TextInput
              style={[styles.signinField/* , { fontSize } */]}
              placeholder="email"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              keyboardType="email-address"
              secureTextEntry={false}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                if (text) {
                  setEmailValid(validator.isEmail(text));
                  updateFormEntry('email', text);
                }
              }}
            />
            <TextInput
              style={styles.signinField}
              placeholder="first name"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              onChangeText={(text) => {
                if (text) {
                  setFNameValid(validator.isAlpha(text));
                  updateFormEntry('firstname', text);
                }
              }}
              autoCorrect={false}
              autoComplete="email"
              autoCapitalize="words"
            />
            <TextInput
              style={styles.signinField}
              placeholder="last name"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              autoCorrect={false}
              onChangeText={(text) => {
                if (text) {
                  setLNameValid(validator.isAlpha(text));
                  updateFormEntry('lastname', text);
                }
              }}
              autoCapitalize="words"
            />
            <TextInput
              style={styles.signinField}
              placeholder="username"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                if (text) {
                  setUNameValid(validator.isAlphanumeric(text));
                  updateFormEntry('username', text);
                }
              }}
            />
            <View>
              <TextInput
                style={styles.signinField}
                placeholder="password"
                placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
                secureTextEntry={hidePassword}
                textAlign="center"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                  if (text) {
                    setPassValid(validator.isAscii(text));
                    updateFormEntry('password', text);
                  }
                }}
              />
              <Pressable style={[styles.signinField, { position: 'absolute', width: 50, right: 20 }]} onPress={toggleHidePassword}>
                <Feather
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={30}
                  color="#333333"
                  style={{ }}
                />
              </Pressable>
            </View>
            <View>
              <TextInput
                style={styles.signinField}
                placeholder="retype password"
                placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
                secureTextEntry={hideConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textAlign="center"
                onChangeText={(text) => {
                  if (text) {
                    if (validator.equals(text, formEntry.password)) setPasswordMatch(true);
                  }
                }}
              />
              <Pressable style={[styles.signinField, { position: 'absolute', width: 50, right: 20 }]} onPress={toggleHideConfirmPassword}>
                <Feather
                  name={hideConfirmPassword ? 'eye' : 'eye-off'}
                  size={30}
                  color="#333333"
                  style={{ }}
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                let alertStr = 'Invalid';
                const eVal = (formEntry.email && isEmailValid);
                const fVal = (formEntry.firstname && isFNameValid);
                const lVal = (formEntry.lastname && isLNameValid);
                const uVal = (formEntry.username && isUNameValid);
                const pVal = (formEntry.password && isPassValid);
                if (eVal && fVal && lVal && uVal && pVal && isPasswordMatch) registerUser();
                if (!eVal) alertStr += ' Email';
                if ((alertStr !== 'Invalid') && !fVal) alertStr += ' and';
                if (!fVal) alertStr += ' First Name';
                if ((alertStr !== 'Invalid') && !lVal) alertStr += ' and';
                if (!lVal) alertStr += ' Last Name';
                if ((alertStr !== 'Invalid') && !uVal) alertStr += ' and';
                if (!uVal) alertStr += ' Username';
                if ((alertStr !== 'Invalid') && !pVal) alertStr += ' and';
                if (!pVal) alertStr += ' Password';
                if ((alertStr !== 'Invalid') && !isPasswordMatch) alertStr += ' and';
                if (!isPasswordMatch) alertStr += ' Passwords Do Not Match';
                if (!(eVal && fVal && lVal && uVal && pVal && isPasswordMatch)) dropdownAlert.alertWithType('custom', 'Warning:', alertStr);
              }}
              style={[styles.signinPrompt, { marginTop: 15 }]}
            >
              <Text style={styles.signinPromptText}>Submit</Text>
            </Pressable>

          </KeyboardAwareScrollView>
          <DropdownAlert
            ref={(ref) => {
              if (ref) {
                dropdownAlert = ref;
              }
            }}
            containerStyle={styles.dropDownPaw5}
          />
        </Modal>

      </View>

    </View>
  );
}
