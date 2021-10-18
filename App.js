/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { firebaseConfig,COLORS } from './src/constants';
import MainStackNavigator from './src/navigator/Navigator';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import * as firebase from 'firebase/app'
// firebase.initializeApp(firebaseConfig);

const App = () => {
  return(
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.background}/>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </>

    );
};

const styles = StyleSheet.create({

});

export default App
