import React, { useState } from 'react'
import {View,Text,SafeAreaView,StyleSheet,ImageBackground,KeyboardAvoidingView,TextInput} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {COLORS,SIZES} from '../constants';
import Button from '../components/Button';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const imageSrc="../../assets/images/backgroundImage.png";

const SignIn = ({navigation}) => {

const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const auth = getAuth();
const signIn = (email,password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
       navigation.navigate('MenuScreen')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Предупреждение","Неверный Email или пароль")
    });
}

if(auth.currentUser){
 navigation.navigate('MenuScreen')
}

 return (
   <SafeAreaView style={{
     flex:1,
     backgroundColor:COLORS.background,
     position:'relative'
   }}>
       <ImageBackground source={require(imageSrc)} resizeMode="cover" style={{width: '100%', height: '100%',justifyContent: 'center'}}>
       <KeyboardAvoidingView style={{flex:1}} behavior="padding">
       <View style={styles.container}>
           <TextInput style={styles.input} onChangeText={(email)=>setEmail(email)} placeholder="Эл.Почта"/>
           <View style={{
               position: 'relative',
               justifyContent: 'center'
           }}>
             <TextInput style={styles.input} onChangeText={(password)=>setPassword(password)} placeholder="Пароль" secureTextEntry={showPassword ? false : true} />
             <AntDesignIcon name="eye" onPress={()=>setShowPassword(!showPassword)} style={{
                 position:"absolute",
                 right:SIZES.base*2,
                 fontSize:30,
                 color: showPassword ? COLORS.lightGray : COLORS.black
               }}/>
             </View>
             <View style={[styles.row,{marginBottom:SIZES.base,justifyContent: 'flex-end',paddingRight:20}]}>
               <Text onPress={()=>{navigation.navigate('ForgotPasswordScreen')}} style={styles.underline}>Забыли пароль?</Text>
             </View>
             <View style={{alignItems: 'center',justifyContent:'center'}}>
               <Button label={"Войти в систему"} isPrimary={false} handleOnPress={()=>signIn(email,password)} />
             </View>
             <View style={styles.row}>
             <Text style={styles.secondaryRowText}>Еще нету аккаунта?</Text><Text style={[styles.secondaryRowText,styles.underline]} onPress={()=>{navigation.navigate('CreateAccountScreen')}}>Создать</Text>
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
     backgroundColor:COLORS.transparent,
     borderRadius:5,
     paddingVertical:SIZES.base,
     borderBottomWidth: 1,
   },
   bold: {fontWeight: 'bold'},
   italic: {fontStyle: 'italic'},
   underline: {textDecorationLine: 'underline'},

 });

 export default SignIn
