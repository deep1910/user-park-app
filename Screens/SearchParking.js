import { View, Text, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'

import { collection, addDoc, doc , onSnapshot ,getDocs} from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebaseConfig';


const citiesCollectionRef = collection(db, "names");



const SearchParking = () => {

  useEffect(() => {
      
    async function fetchData() {
    const querySnapshot = await getDocs(citiesCollectionRef);
  
  const cities = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
  }));
  console.log(cities.length);

}
fetchData()
},[])

  return (
    <View>
       <View style={{borderWidth:1 ,padding:10, backgroundColor:'skyblue'}}>
        <TextInput placeholder='Search Location' style={{ backgroundColor: '#DCC1BC', padding:10, fontSize:20}}/>
         </View>
      {/* <MapView style={{height:'90%', width:'100%'}} >
         
     

      </MapView> */}


      <MapView
        userInterfaceStyle='dark'
        // mapType='hybrid'
        mapType='standard'
        style={{height:'90%', width:'100%'}}
        showsCompass={true}
        maxZoomLevel={20}
        // minZoomLevel={10}
        provider={PROVIDER_GOOGLE}
      
        initialRegion={{
          latitude: 20.77940,
          longitude: 76.67873,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>


       
        
       
        <Marker
          coordinate={{ latitude: 20.77940, longitude: 76.67873 }}
          title="My Location"
        />
  


  
      </MapView>
    </View>
  )
}

export default SearchParking