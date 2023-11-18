
import React ,{useEffect,useContext, useState } from 'react';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';

import { StyleSheet, Text, View,Button} from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async()=>{
        return {
            shouldPlaySound:true,
            shouldSetBadge:true,
            shouldShowAlert:true
        }
    }
});

const Notification = ()=> {
    const {token} = useContext(AuthContext);
    const [pushToken, setPushToken] = useState('');

    
  const fetchPushTokenForNotifications = async ()=>{
    console.log('Entered into fetchPushTokenForNotifications API:::'+ token);
  const pushTokenData= await Notifications.getExpoPushTokenAsync();
  setPushToken(pushTokenData.data);
    console.log("In fetchPushTokenForNotifications pushTokenData:"+pushToken);
    const bodyData={	"pushToken"	:pushToken,
    "vendor":"3001003"}
    try{
    const response = await ezcAuthApi.get('/auth/test/getMobileInfoForNotifications',bodyData,  {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    const objString = JSON.stringify(response.data.pushtoken);
    console.log("fetch Push Token Notification response:  "+objString);
    setPushToken(response.data.pushToken);
    
}
catch(err){
    console.log("coming to exce");
  
}
}

    async function sendPushNotification() {
        console.log("expoPushToken "+pushToken);
        
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to:pushToken,
            sound: 'default',
            title: 'PO Acknowledgement is pending',
            body: 'PO No 4800009316 is pending to acknowledge',
            data: { "PO No": '4800009316' },
          }),
        });
      }

   

    useEffect(()=>{
      fetchPushTokenForNotifications();
        const subscription = Notifications.addNotificationReceivedListener((notification)=>{
            console.log("Notification Received");
            console.log(notification);
            const user= notification.request.content.data.userName;
            console.log("Hey "+user+" received Notification");
        });
       

        return ()=>{
          subscription.remove();  
        };

    },[]);

 function NotificationHandler(){
    console.log("coming to NotificationHandler");
    Notifications.scheduleNotificationAsync({
        content: {
            title: 'Local Notification',
            body: "It is regarding push Notifications!",
            data: {userName :'Nagesh'}
          },
          trigger:{
            seconds:5
          }
    });
 }


  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
        <Button title="Notification" onPress={NotificationHandler} />
        <Button title="Push Notification" onPress={sendPushNotification} />
    </View>
  );
}

export default Notification;

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
