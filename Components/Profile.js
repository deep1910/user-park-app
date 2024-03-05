import { View, Text , TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import {Ionicons} from 'react-native-vector-icons';


const Profile = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [mobile, setMobile] = React.useState('');


  return (
    <View>
      {/* <Text>Account</Text> */}
      {/* <Text style={{fontSize:24, margin:20, marginTop:40}}>Account Information</Text>  */}
            <View style={{backgroundColor:'white'}}>
            <Ionicons name="person" size={100} color="grey" style={{backgroundColor:'#C6C7C6', marginTop:10, width:150, height:150, justifyContent:'center',borderWidth:7,marginHorizontal:100,marginBottom:30, borderRadius:100, alignItems:'center', padding:20, paddingLeft:25,borderColor:'white' }}/>
            <Ionicons name="camera-outline" size={30} color="blue" style={{position:'absolute', top:110,right:110, backgroundColor:'white',padding:2,borderRadius:100}}/>
            <View>
          
                <TextInput value={name} onChangeText={(text)=> setName(text)} style={{borderWidth:1 ,width:'90%',height:45,marginHorizontal:20,borderRadius:10,paddingLeft:15, backgroundColor:'#C6C5C5', marginBottom:15}} placeholder="Full Name"/>
                <TextInput  value={email} onChangeText={(text)=> setEmail(text)} style={{borderWidth:1 ,width:'90%',height:45,marginHorizontal:20,borderRadius:10,paddingLeft:15, backgroundColor:'#C6C5C5', marginBottom:15}} placeholder="Email"/>
                <TextInput  value={gender} onChangeText={(text)=> setGender(text)}  style={{borderWidth:1 ,width:'90%',height:45,marginHorizontal:20,borderRadius:10,paddingLeft:15, backgroundColor:'#C6C5C5', marginBottom:15}} placeholder="Gender"/>
                <TextInput  value={mobile} onChangeText={(text)=> setMobile(text)} style={{borderWidth:1 ,width:'90%',height:45,marginHorizontal:20,borderRadius:10,paddingLeft:15, backgroundColor:'#C6C5C5', marginBottom:15}} placeholder="Mobile Number"/>

          
            </View>
            <TouchableOpacity onPress={() =>addField()}>
            <Text style={{fontSize:24, margin:20, marginTop:40, borderWidth:1, width:80,borderRadius:10, padding:10}}>Save</Text>
            </TouchableOpacity>
           
            </View>
    </View>
  )
}

export default Profile