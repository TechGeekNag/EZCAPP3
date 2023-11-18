import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
import * as Notifications from 'expo-notifications';
import ezcAuthApi from '../api/ezcAuthApi';

function DashBoardScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState('');
  const [pushToken, setPushToken] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;


  //const {token} = useContext(AuthContext);

  const registerPushNotifications = async (pushTokenData)=>{
    console.log('Entered into registerPushNotifications API:::'+ token);
    const bodyData={	"pushToken"	:pushTokenData,
    "vendor":"3001003"}
    try{
    const response = await ezcAuthApi.post('/auth/test/registerForNotification',bodyData,  {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    const objString = JSON.stringify(response.data);
    console.log("Push Notification response:  "+objString);
    
}
catch(err){
    console.log("coming to exce in registerPushNotifications");
  
}
}

  async function configurePushNotifications(){
    const {status} = await Notifications.getPermissionsAsync();
    let finalStaus =status;
    if(finalStaus !== 'granted'){
        const {status} =await Notifications.requestPermissionsAsync();
        finalStaus=status;
    }
    if(finalStaus !== 'granted'){
        Alert.alert("Permission required","Push Notifications required permissions");
        return;
    }
   const pushTokenData= await Notifications.getExpoPushTokenAsync();
        console.log("pushTokenData "+pushTokenData);
        console.log(JSON.stringify(pushTokenData.data));
        setPushToken(pushTokenData.data);
        registerPushNotifications(pushTokenData.data);

        

    if(Platform.OS ==='android'){
        Notifications.setNotificationChannelAsync('default',{
            name:'default',
            importance:Notifications.AndroidImportance.DEFAULT
        });
    }
}

useEffect(()=>{
  //configurePushNotifications();
},[pushToken]);


  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default DashBoardScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
