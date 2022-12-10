import React from 'react';
import {
  View, Image, ActivityIndicator, Dimensions,
} from 'react-native';

import logo from '../../assets/Paw5Logo.png';
import { pawPink } from '../constants/Styles';

export default function Loader({
  show, children,
}) {
  if (show) {
    return (
      <View style={{
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pawPink,
        height: '100%',
      }}
      >
        <Image resizeMode="contain" style={{ width: Dimensions.get('window').width - 40 }} source={logo} />

        <ActivityIndicator size="large" />

      </View>
    );
  }
  return children;
}
