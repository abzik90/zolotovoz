import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {Welcome,CreateAccount,CreateProAccount,SignIn,ForgotPassword,Menu} from '../screens';

const Stack = createStackNavigator();

const MainStackNavigator = ({initialRoute="WelcomeScreen"}) => {
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
    <Stack.Screen name="WelcomeScreen" component={Welcome} />
    <Stack.Screen name="CreateAccountScreen" component={CreateAccount} />
    <Stack.Screen name="CreateProAccountScreen" component={CreateProAccount} />
    <Stack.Screen name="SignInScreen" component={SignIn} />
    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    <Stack.Screen name="MenuScreen" component={Menu} />

    </Stack.Navigator>
  )
}

export default MainStackNavigator;
