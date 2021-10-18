import React, { useState } from 'react'
import {Alert,Linking,View,Text,SafeAreaView,StyleSheet,ImageBackground,KeyboardAvoidingView,TextInput,ScrollView} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from "react-native-image-picker"

import {firebaseConfig,COLORS,SIZES} from '../constants';
import Button from '../components/Button';
import FileInput from '../components/File'

import { initializeApp, getApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set } from "firebase/database";


const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp,"gs://sewage-35ef2.appspot.com");

const createFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch (e) {
    return initializeApp(config);
  }
};

const app = createFirebaseApp(firebaseConfig)

const database = getDatabase(app);
const imageSrc="../../assets/images/backgroundImage.png";

const CreateProAccount = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [midname,setMidname] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [passport,setPassport] = useState("")
  const [password, setPassword] = useState("")

  const [photoName, setPhotoName] = useState("Фото")
  const [photoType,setPhotoType] = useState("")

  const [path, setPath] = useState(null)
  const [data, setData] = useState(null)
  const [uri, setUri] = useState(null)

  var getFileBlob = function (url, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.addEventListener('load', function() {
        cb(xhr.response);
      });
      xhr.send();
    };

  const selectFromLibrary = () =>{
        let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        // console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = { uri: response.uri };
          // console.log('response', JSON.stringify(response));
          setPath(response);
          setData(response.data);
          setUri(JSON.stringify(response['assets'][0]['uri']).replace('"','').replace('"',''));
          console.log("ResponseAsset:"+JSON.stringify(response.assets));
          setPhotoName(JSON.stringify(response['assets'][0]['fileName']).replace('"','').replace('"',''));
          // setPhotoName(photoName)
          setPhotoType(JSON.stringify(response['assets'][0]['fileName']).replace('"','').replace('"','').split('.').pop());


        }
      });
    }

  async function dbRow(uid){
    // let imageId = Math.round((new Date()).getTime() / 1000)+"."+photoType;
    let imageId = uid+"_profile."+photoType;
    console.log(imageId);

    const storageRef = ref(storage,"profile/"+imageId);
    // getFileBlob(uri, blob =>{
    //     console.log(blob);
    //     console.log(storageRef);
    //     uploadBytes(storageRef, blob).then((snapshot) => {
    //       console.log('Uploaded a blob or file!');
    //     })
    // }).catch(function(error) {
    //   console.log('There has been a problem with your fetch operation: ' + error.message);
    // });
    const blob = await fetch(uri)
      .then((response) => response.blob())
      .then((blob) => {
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log(storageRef);
          console.log('Uploaded a blob or file!');
        }).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      });

    console.log(blob);

    set(ref(database, 'specialists/' + uid), {
      first_name: name,
      surname: surname,
      midname: midname,
      phone: phone,
      email: email,
      passport: passport,
      profilePic: "profile/"+imageId
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
                <TextInput style={styles.input} onChangeText={(midname)=>setMidname(midname)} placeholder="Отчество"/>
                <TextInput style={styles.input} onChangeText={(phone)=>setPhone(phone)} placeholder="Телефон" keyboardType="phone-pad"/>
                <TextInput style={styles.input} onChangeText={(email)=>setEmail(email)} placeholder="Эл.Почта"/>
                <FileInput style={styles.input} label={photoName} handleOnPress={()=>selectFromLibrary()} />
                <TextInput style={styles.input} onChangeText={(passport)=>setPassport(passport)} placeholder="Паспорт РФ"/>
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

export default CreateProAccount
