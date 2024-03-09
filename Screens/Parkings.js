import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import History from '../Components/History';
import SearchParking from './SearchParking';

const Tab = createMaterialTopTabNavigator();

const Parkings = () => {
  // const {userdetail} = route.params;
  // console.log("userdetails" ,userdetail);
  // console.log(route.params);
  return (
     
    <Text>History</Text>
  )
}

export default Parkings