/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
// Required imports
import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import Base from './Base';

export default function App() {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
}

registerRootComponent(App);
