import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps'

import { collection, addDoc, doc , onSnapshot ,getDocs} from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebaseConfig';


const citiesCollectionRef = collection(db, "names");

 

// const coord = [];


const SearchParking = () => {
  const [markercoord, setMarkercoord] = useState([]);
  //  const [markercoord = []
  //  const [ismarkers, setIsmarkers] = useState(false);
  //  let coordlen = 0;

  useEffect(() => {
      

 

    async function fetchData() {
    const querySnapshot = await getDocs(citiesCollectionRef);
  
  const cities = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
  }));

  setMarkercoord(cities);



}
fetchData();
// console.log(markercoord);
// console.log(markercoord.length);
// console.log(coordlen);

}

  ,[])




  return (
    <View>
       <View style={{borderWidth:1,  }}>
        <TextInput placeholder='Search Location' style={{ backgroundColor: '#DCC1BC', padding:10, fontSize:20}}/>
         </View>
  

      <MapView
        userInterfaceStyle='dark'
        // mapType='hybrid'
        mapType='standard'
        style={{height:630, width:'100%'}}
        showsCompass={true}
        maxZoomLevel={20}
        // minZoomLevel={10}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 20.77940,
          longitude: 76.67873,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>


       { markercoord.map((coordinate, index) => {
         console.log("MARKER", coordinate.parkcoord[0][0], coordinate.parkcoord[0][1]);
         return <Marker
          // title={coordinate.parkname}
          // anchor={{x:0.5, y:2}}
          description='Address: 1234, XYZ Street, ABC City, 123456\n\nPrice: $10/hour'
          key={ coordinate.id}
          coordinate={{ latitude: coordinate.parkcoord[0][1], longitude: coordinate.parkcoord[0][0] }}
          title="Ground Parking"
          

        >
           <Callout >
          
            <Text>{coordinate.parkname}</Text>
        <Text>{coordinate.address}</Text>
        <Text>Pricing: Rs.{coordinate.pricing}/hr </Text>
        <Text>Availability:</Text>
       
      </Callout>
        </Marker>

       })}


      </MapView>
    </View>
  )
}

export default SearchParking