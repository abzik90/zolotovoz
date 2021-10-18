import React from 'react';
import {View,Text,SafeAreaView,ImageBackground,Image} from 'react-native';
import {COLORS,SIZES} from '../constants';
import {Icon} from "../constants/logo.js";
import Button from '../components/Button';
const imageSrc="../../assets/images/backgroundImage.png";

const Welcome = ({navigation}) => {
  return (
      <SafeAreaView>
      <ImageBackground source={require(imageSrc)} resizeMode="cover" style={{width: '100%', height: '100%',justifyContent: 'center'}}>
        <View style={{
          justifyContent:'center',
          alignItems:'center',
          height: SIZES.base*15,
          margin:SIZES.base*2.5,
          borderRadius: 15,
          backgroundColor:COLORS.transparent,
          borderWidth: 1,
          borderColor:COLORS.blue,
        }}>
        <Text style={{
          color:COLORS.blue,
          fontSize:27,
        }}>СЛУЖБА АВАРИЙНОЙ</Text>
        <Text style={{
          color:COLORS.black,
          fontSize:27,
        }}>ЧИСТКИ КАНАЛИЗАЦИИ</Text>
        <Text style={{
          color:COLORS.black,
          fontSize:18,
        }}>В МОСКВЕ И В МОСКОВСКОЙ ОБЛАСТИ</Text>
        <Image width={50} height={30} src={Icon}/>
        </View>
        <View style={{
          justifyContent:'flex-end',
          alignItems:'center',
          marginTop:SIZES.base*15,
        }}>
        <Button label={"Начать пользоваться"} isPrimary={true} handleOnPress={()=>navigation.navigate('CreateAccountScreen')} />
        <Button label={"Войти в аккаунт"} isPrimary={false} handleOnPress={()=>navigation.navigate('SignInScreen')} />
        </View>
        </ImageBackground>
      </SafeAreaView>

  );
};

export default Welcome;
