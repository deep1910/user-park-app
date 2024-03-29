import { View, Text, TouchableOpacity } from 'react-native'
import React , {useState, useContext} from 'react'
import Profile from './Profile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { client } from '../Constants/KindeConfig'
import { AuthContext } from '../Constants/AuthContext'

const Account = () => {

  const [editProfile, setEditProfile] = useState(false)
  
  const [login, setLogin] = useState(false)


  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    const loggedout = await client.logout();
    if (loggedout) {
       console.log(auth);
      // auth = false;
      setAuth(false);
      console.log("Logout success")
      // User was logged out
    }
  };

  return (
    <View>
      {/* <Text>Account</Text> */}
    

     <TouchableOpacity style={{display:'flex',margin:30,marginBottom:20, flexDirection:'row', alignItems:'center' , gap:10}}  onPress={() => setEditProfile(!editProfile)}>
         

     <Text style={{fontSize:20}}>Edit Profile</Text>
     <Ionicons name="create-outline"size={24} />
  </TouchableOpacity>
   

{editProfile && <Profile/>}

<TouchableOpacity  style={{ top:400, left:30,}} onPress={handleLogout}>
       <Text style={{fontSize:20, borderWidth:1, padding:15, width:100, borderRadius:10}}>Logout</Text>  
    </TouchableOpacity>  
   

      
      
    </View>
  )
}

export default Account