import { View, Text,Switch,  Button , Platform} from 'react-native'
import React , { useState, useEffect, useRef} from 'react'
import * as Device from 'expo-device';
import * as Notification from 'expo-notifications';
import { TouchableOpacity } from 'react-native-gesture-handler';


Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function Notifications(){



  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notification.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notification.removeNotificationSubscription(notificationListener.current);
      Notification.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    //  <View
    //   style={{
    //   flex: 1,
    //    alignItems: 'center',
    //     justifyContent: 'space-around',
    //  }}>
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Title: {notification && notification.request.content.title} </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    //   </View>
    //   <Button
    //     title="Press to schedule a notification"
    //     onPress={async () => {
    //       await schedulePushNotification();
    //     }}
    //   />
    // </View>
   



    <View>
      <View style={{width:'90%'}}>
      <Text style={{fontSize:24 }} > Allow Notification for Parking Exit</Text>
      </View>
       
   
       <View style={{  justifyContent:'flex-end' }}>
      <Switch
        style={{height:50, width:100, borderRadius:50}}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f6bd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {/* <Text>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text> */}

    </View>
    <Button
        style={{}}
        title="Press to schedule a notification"
         onPress={async () => {
         await schedulePushNotification();
        }}/> 
    </View>
  );




  
async function schedulePushNotification() {
  await Notification.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 5 },
    // trigger:null,
  });
}




async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notification.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notification.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF230F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notification.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notification.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notification.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


  // return (
  //   <View style={{margin:40}}>
  //     <Text style={{fontSize:30}}>Notifications</Text>
  //   </View>
  // )
}

// export default Notifications