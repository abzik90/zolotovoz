import React, { useState } from 'react'
import {Alert, View,Text,SafeAreaView,StyleSheet,ImageBackground,KeyboardAvoidingView,TextInput,ScrollView} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {firebaseConfig,COLORS,SIZES} from '../constants';
import Button from '../components/Button';
import { initializeApp, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const createFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch (e) {
    return initializeApp(config);
  }
};

const app = createFirebaseApp(firebaseConfig)

// const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const imageSrc="../../assets/images/backgroundImage.png";

const CreateAccount = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function dbRow(uid){
    set(ref(database, 'users/' + uid), {
      first_name: name,
      surname: surname,
      phone: phone,
      address: address,
      email: email,
    });
  }

  const signUp = (email,password) => {
    try{
      if(password.length < 6){
        Alert.alert("Предупреждение","Введите пожалуйста не меньше 6 символов");
        return;
      }
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode === "auth/email-already-in-use"){
            Alert.alert("Предупреждение","Email уже используется")
          }else{
            Alert.alert("Предупреждение","Не удалось создать аккаунт")
          }
          console.log(errorCode)
        });
        if(auth.currentUser){
          dbRow(auth.currentUser['uid']);
          navigation.navigate('MenuScreen')
        }
    }
    catch(error){
      console.log(error.toString())
    }
  }
    return (
        <SafeAreaView style={{
          flex:1,
          backgroundColor:COLORS.background,
          position:'relative'
        }}>
            <ImageBackground source={require(imageSrc)} resizeMode="cover" style={{width: '100%', height: '100%',justifyContent: 'center'}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text style={{
                  fontSize:27,
                  opacity:0.7,
                  marginHorizontal:SIZES.base,
                  marginBottom:SIZES.base

                }}>Здравствуйте!</Text>
                <TextInput style={styles.input} onChangeText={(name)=>setName(name)} placeholder="Имя"/>
                <TextInput style={styles.input} onChangeText={(surname)=>setSurname(surname)} placeholder="Фамилия"/>
                <TextInput style={styles.input} onChangeText={(phone)=>setPhone(phone)} placeholder="Телефон" keyboardType="phone-pad"/>
                <TextInput style={styles.input} onChangeText={(email)=>setEmail(email)} placeholder="Эл.Почта"/>
                <TextInput style={styles.input} onChangeText={(address)=>setAddress(address)} placeholder="Адрес"/>
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
                  <View style={styles.row}>
                    <Text>Явлеетесь </Text><Text onPress={()=>{navigation.navigate('CreateProAccountScreen')}}style={styles.underline}>исполнителем?</Text>
                  </View>
                  <View style={{alignItems: 'center',justifyContent:'center'}}>
                    <Button label={"Создать новый аккаунт"} isPrimary={true} handleOnPress={()=>signUp(email,password)} />
                  </View>
                  <View style={styles.row}>
                  <Text style={styles.secondaryRowText}>У вас уже есть аккаунт? </Text><Text style={[styles.secondaryRowText,styles.underline]} onPress={()=>{navigation.navigate('SignInScreen')}}>Войти</Text>
                  </View>
                  </View>
                </ScrollView>
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

export default CreateAccount
