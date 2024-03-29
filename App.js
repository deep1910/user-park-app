// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });






import 'react-native-gesture-handler';


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Link, NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Parkings from './Screens/Parkings';

import Settings from './Screens/Settings';
import SearchParking from './Screens/SearchParking';
import Vehicles from './Screens/Vehicles';
import { AuthContext } from './Constants/AuthContext';

import { client } from './Constants/KindeConfig';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  const Drawer = createDrawerNavigator();
  const [auth,setAuth] = useState(false);
  const [userdetail , setUserdetail] = useState(null);



useEffect(() => {
  checkAuthenticate();
}, [auth]);


  const checkAuthenticate = async () => {
    // Using `isAuthenticated` to check if the user is authenticated or not
    if (await client.isAuthenticated) {
      const userProfile = await client.getUserDetails();
      console.log(userProfile); 
      setUserdetail(userProfile);
      setAuth(true);
        // Need to implement, e.g: call an api, etc...
    } else {
      setAuth(false);
      //  <LoginScreen/>
        // Need to implement, e.g: redirect user to sign in, etc..
    }
};


  return (
    <AuthContext.Provider value={{auth,setAuth}}>
    <NavigationContainer>
    {auth ?<Drawer.Navigator  >
      
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Search Parkings" component={SearchParking} initialParams={{userdetail: userdetail}} />
      <Drawer.Screen name="My Parkings" component={Parkings}  />
      <Drawer.Screen name="Vehicles" component={Vehicles} initialParams={{userdetail: userdetail}}/>
      <Drawer.Screen name="Settings" component={Settings} />
      
    </Drawer.Navigator>: 
    <LoginScreen/>
 }  
   


    </NavigationContainer>
    </AuthContext.Provider>
 
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
