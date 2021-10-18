import React from 'react'
import {View,Text,SafeAreaView,StyleSheet,ImageBackground,KeyboardAvoidingView,TextInput} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {COLORS,SIZES} from '../constants';
import Button from '../components/Button';

const imageSrc="../../assets/images/backgroundImage.png";

 const ForgotPassword = ({navigation}) => {
 return (
   <SafeAreaView style={{
     flex:1,
     backgroundColor:COLORS.background,
     position:'relative'
   }}>
       <ImageBackground source={require(imageSrc)} resizeMode="cover" style={{width: '100%', height: '100%',justifyContent: 'center'}}>
          <AntDesignIcon name="arrowleft" style={{fontSize:30}} onPress={() => {navigation.goBack();}}/>
          <KeyboardAvoidingView style={{flex:1}} behavior="padding">
             <View style={styles.container}>
                 <TextInput style={styles.input} placeholder="Эл.Почта для сброса"/>
                   <View style={{alignItems: 'center',justifyContent:'center'}}>
                     <Button label={"Войти в систему"} isPrimary={false} handleOnPress={()=>navigation.navigate('SignInScreen')} />
                   </View>
             </View>
           </KeyboardAvoidingView >
       </ImageBackground>
   </SafeAreaView>
   )
 }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      padding:20
    },
    row:{
      justifyContent:'center',
      flexDirection:'row',
    },
    secondaryRowText:{
      fontWeight:'bold',
      fontSize:16
    },
    input:{
      padding:SIZES.base,
      marginHorizontal:SIZES.base,
      marginTop:SIZES.base,
      marginBottom:SIZES.base,
      backgroundColor:COLORS.transparent,
      borderRadius:5,
      paddingVertical:SIZES.base,
      borderBottomWidth: 1,
    },
    bold: {fontWeight: 'bold'},
    italic: {fontStyle: 'italic'},
    underline: {textDecorationLine: 'underline'},

  });

 export default ForgotPassword
