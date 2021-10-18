import React, { useState } from 'react'
import {View,Text,SafeAreaView,StyleSheet,ImageBackground,KeyboardAvoidingView,TextInput} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {COLORS,SIZES} from '../constants';
import Button from '../components/Button';

const imageSrc="../../assets/images/backgroundImage.png";

 const Menu = ({navigation}) => {
 return (
   <SafeAreaView style={{
     flex:1,
     backgroundColor:COLORS.background,
     position:'relative'
   }}>
       <ImageBackground source={require(imageSrc)} resizeMode="cover" style={{width: '100%', height: '100%',justifyContent: 'center'}}>

       </ImageBackground>
   </SafeAreaView>
   )
 }

 export default Menu
