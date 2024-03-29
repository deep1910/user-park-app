import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';

import { collection, addDoc, doc , onSnapshot ,getDocs} from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebaseConfig';
import { ref,onValue } from 'firebase/database';
import { database } from '../firebaseConfig';

const citiesCollectionRef = collection(db, "names");

 

// const coord = [];


const SearchParking = ({route, navigation}) => {
 
    const [dataelement, setDataelement]  = useState({ latitude: 20.77940, longitude: 76.67873 })


   const { userdetail } = route.params;
  console.log(userdetail);
  // const {track} = route.params;
  // console.log(track);
  const [markercoord, setMarkercoord] = useState([]);
  //  const [markercoord = []
  //  const [ismarkers, setIsmarkers] = useState(false);
  //  let coordlen = 0;


  useEffect(()=>{
    const id = userdetail.id;
    // console.log(id);
   // checkauthenticated()
    //console.log(userdetail?.id);
    const dbstarRef = ref (database, 'users/user/' + id);
           
    const unsubscribe =  onValue(dbstarRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Data",data);
        setDataelement({latitude: data.location.coords.latitude, longitude : data.location.coords.longitude})
        console.log(dataelement);
    })

    return (()=> unsubscribe())
  }, [])
  






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



  function RegisterPark({parkName}){
    navigation.navigate('Home')
    

    console.log("Register Park", parkName);
  }




  return (
    <View>
       {/* <View style={{borderWidth:1,  }}> */}
        {/* <TextInput placeholder='Search Location' style={{ backgroundColor: '#DCC1BC', padding:10, fontSize:20}}/> */}
         {/* </View> */}
  

      <MapView
        userInterfaceStyle='dark'
        // mapType='hybrid'
        mapType='standard'
        style={{height:'100%', width:'100%'}}
        showsCompass={true}
        maxZoomLevel={20}
        // minZoomLevel={10}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 20.77940,
          longitude: 76.67873,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>


        { dataelement  &&
         <Marker
             coordinate={dataelement} 
        >
           <Ionicons name="car-sport" size={20} color="#900C3F" ></Ionicons>
        </Marker>
           }

         
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
           <Callout onPress={()=> RegisterPark(coordinate.parkname) }>
          
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