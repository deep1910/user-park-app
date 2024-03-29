
import { View, Text, StyleSheet,Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect , useState} from 'react'
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker';

import { Picker } from '@react-native-picker/picker';






const Home = ({navigation}) => {

  const [selectedVehicle, setSelectedVehicle] = useState("Suzuki");
  const [selectedPark, setSelectedPark] = useState("Select Parking");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTill, setDateTill] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTill, setShowTill] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || dateFrom;
    setShowFrom(false);
    setDateFrom(currentDate);
  };

  const onChangeTill = (event, selectedDate) => {
    const currentDate = selectedDate || dateTill;
    setShowTill(false);
    setDateTill(currentDate);
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const showTimepickerFrom = () => {
    setShowFrom(true);
  };

  const showTimepickerTill = () => {
    setShowTill(true);
  };

const [cities, setCities] = useState([])
const [cars, setCars] = useState([])


useEffect(()=>{
  axios.get('http://192.168.55.203:3000/api/fire')
  .then(response => {
    console.log("firestore", response.data);
    // const dataArray = Object.values(response.data)
    // cities = response.data
    setCities(response.data)
    // console.log(cities);
    // setRealtime(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

//   // if(cities.length != 0 ){
//   //   cities.map((city) =>{
//   //     console.log(city)
//   //   })
//   // }
 getCars()

},[])


function getCars(){
  axios.get('http://192.168.55.203:3000/api/parkname')
  .then(response => {
    console.log("cars", response.data);
    setCars(response.data)
})   
}


const hours = Math.abs(dateTill - dateFrom) / 36e5; // Calculate the difference in hours
const selectedParkObject = cities.find(city => city.parkname === selectedPark);
const selectedParkPricing = selectedParkObject ? selectedParkObject.pricing : 0;
const totalPricing = hours * selectedParkPricing;

function ConfirmParking(){
  //  cars.length
  console.log("Selected", selectedVehicle);
  let vehicledata;
  for (let key in cars) {
    if (cars[key].vehiclename === selectedVehicle) {
      // console.log(data[key].vehiclename);
      // selectedVehicle = cars[key];
      if (typeof cars[key].location.coords === 'object') {
        cars[key].location.coords = JSON.stringify(cars[key].location.coords);
      }
  
      console.log("Park",selectedPark);
      console.log("Vehicle",selectedVehicle);
      vehicledata = cars[key];

    }
  }
  // console.log(cars);
  if (typeof selectedPark.parkcoord === 'object') {
    selectedPark.parkcoord = JSON.stringify(selectedPark.parkcoord);
  }


  const data = {
    selectedPark: selectedPark,
    selectedVehicle: vehicledata,
    dateFrom: dateFrom.toISOString(),
    dateTill: dateTill.toISOString(),
    totalPricing: totalPricing
  }



  console.log(data);
  axios.post("http://192.168.55.203:3000/api/reg-data", data)
  .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));

}


  return (

    <View style={{padding:20}}>
  
       {/* <TouchableOpacity  style={{marginBottom:40, backgroundColor:'#EACFDA', width:200, alignItems:'center'}}  onPress={() => navigation.navigate('SearchParking')}>
          <Text style={{fontSize:20}}>Search For Parkings</Text>
       </TouchableOpacity>  */}

       
         <Text>Register Parking </Text>
           <Picker
        selectedValue={selectedPark}
        onValueChange={(itemValue, itemIndex) => setSelectedPark(itemValue)}
      > 
      {
        cities.map((city, index) => {
          return <Picker.Item label={city.parkname+ "   (Rs." + city.pricing + '/hr)'} value={city.parkname} key={index}/>
        })

      } 
      
      </Picker>
          <Picker
        selectedValue={selectedVehicle}
        onValueChange={(itemValue, itemIndex) => setSelectedVehicle(itemValue)}
      >
        <Picker.Item label="Suzuki" value="Suzuki" />
       
      </Picker>
   

    <View >
      <Button title="Select Date" onPress={showDatepicker} />
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <View style={{display:'flex',marginTop:10,marginBottom:20, flexDirection:'row',justifyContent:'space-around'}}>
      <Button title="From" onPress={showTimepickerFrom} />
      {showFrom && (
        <DateTimePicker
          testID="dateTimePickerFrom"
          value={dateFrom}
          mode="time"
          is24Hour={true}
          onChange={onChangeFrom}
        />
      )}
      <Button title="Till" onPress={showTimepickerTill} />
      {showTill && (
        <DateTimePicker
          testID="dateTimePickerTill"
          value={dateTill}
          mode="time"
          is24Hour={true}
          onChange={onChangeTill}
        />
      )}
  

      </View>
     
    </View>
       
       {/* {currentDate} */}
       <View>
           <Text>Selected Date: {date.toDateString()}</Text>
          <Text>From:  {`${dateFrom.getHours() % 12 || 12}:${dateFrom.getMinutes()} ${dateFrom.getHours() < 12 ? 'AM' : 'PM'}`}</Text>
          <Text>Till: {`${dateTill.getHours()% 12 || 12}:${dateTill.getMinutes()} ${dateFrom.getHours() < 12 ? 'AM' : 'PM'}`}</Text>
          <Text>Estimated Pricing: Rs. {totalPricing.toFixed(2)}</Text>

       </View>
        <View>
    <Button title="Confirm" onPress={() => ConfirmParking()}/>
       </View>
       
    </View>




  )
}

export default Home


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
 
//   });
  