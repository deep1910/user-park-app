import {View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import { client } from '../Constants/KindeConfig'
// import { AuthContext } from '../../App';
import { AuthContext } from '../Constants/AuthContext'

export default function LoginScreen() {

const {auth , setAuth} = useContext(AuthContext);
// const {auth , setAuth} = useContext(AuthContext); 
const handleSignUp = async () => {
  const token = await client.register();
  if (token) {
    console.log("Authenticated success")
    // User was authenticateds
    setAuth(true);
  }
};

const handleSignIn = async () => {
  const token = await client.login();
  if (token) {
    console.log("Sign in Authenticated success")
    // User was authenticated
    setAuth(true);
  }
};




  return (
    <View>
      
      <View style={{padding:50}} >
        <Text  style={{fontSize:45, fontWeight:'bold'}}>Secure Parking App</Text>
         
      </View>
      <TouchableOpacity onPress={handleSignIn} style={{padding:10,backgroundColor:'#fff666', borderRadius:99, marginTop:60, marginBottom:20}}>
        <Text style={{textAlign:'center', fontSize:20}}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp} style={{padding:10,backgroundColor:'#fff666', borderRadius:99, marginTop:5}}>
        <Text style={{textAlign:'center', fontSize:20}}>Create new Account</Text>
      </TouchableOpacity>


     
    </View>
  )
}