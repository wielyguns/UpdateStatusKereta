import React,{useState} from 'react'
import {AsyncStorage,View,Text,set} from 'react-native';
import MainStackNavigator from './src/navigation/MainStackNavigator'
import Login from './src/components/Login/Login'
import MockupUser from './src/mockup/User/MockupUser.json'

function setAsyncUser(){
  AsyncStorage.clear();
  const {nama,alamat,_token} = MockupUser;
  console.log(nama);
  if(_token != null){
    AsyncStorage.setItem('_token', _token);
  }
}

function CheckToken() {
  setAsyncUser();
  const [isToken, setIsToken] = useState(true);
  AsyncStorage.getItem('_token').then( res => {
    console.log(res)
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