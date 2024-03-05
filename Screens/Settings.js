import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Account from '../Components/Account';
import Notifications from '../Components/Notifications';
// import Profile from '../Components/Account';

const Tab = createMaterialTopTabNavigator();


const Settings = () => {
  return (

    <Tab.Navigator>
    <Tab.Screen name="Account" component={Account} />
    <Tab.Screen name="Notifications" component={Notifications} />
  </Tab.Navigator>
    // <View>
    //   <Text>Settings</Text>
    // </View>
  )
}

export default Settings