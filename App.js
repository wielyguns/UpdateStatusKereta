import React,{useState} from 'react'
import {View,Text,set} from 'react-native';
import MainStackNavigator from './src/navigation/MainStackNavigator'
import Login from './src/components/Login/Login'
import MockupUser from './src/mockup/User/MockupUser.json'
import AsyncStorage from '@react-native-community/async-storage'
function setAsyncUser(){
  // AsyncStorage.clear();
  const {nama,alamat,_token} = MockupUser;
  if(_token != null){
    AsyncStorage.setItem('_token', _token);
    AsyncStorage.setItem('user', JSON.stringify(MockupUser));
  }
}

function CheckToken() {
  setAsyncUser();
  const [isToken, setIsToken] = useState(false);
  AsyncStorage.getItem('_token').then( res => {

  if(res == null){
      setIsToken(false);
    }else{
      setIsToken(true);
    }
  });

  if(isToken){
    return (
      <MainStackNavigator/>
    );
  }else{
    return (
      <Login/>
    );
  }
}
export default function App() {
  return <CheckToken />
}