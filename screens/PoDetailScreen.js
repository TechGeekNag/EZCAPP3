import React,{useState,useEffect,useContext} from 'react';
import { View, StyleSheet,FlatList,Alert } from 'react-native';
import { Button, Text} from 'react-native-paper';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';
import { useNavigation } from '@react-navigation/native';





const PoDetailScreen = ({route}) => {
  const navigation=useNavigation();
  const {data} = route.params;
  console.log(data);
    const [results, setResults]=useState([]);
    const [errorMessage,setErrorMessage]=useState('');
    const {token} = useContext(AuthContext);
    const [showAckBut, setShowAckBut] = useState(true);
    const [dispAckMsg, setDispAckMsg] = useState('');

  


    const acknowledgePO = async ()=>{
      console.log('Entered into acknowledgePO API:::'+ token);
      const bodyData={	"poNumber"	:data.poNumber,
      "status":"A"}
      try{
      const response = await ezcAuthApi.post('/auth/po/poAck',bodyData,  {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      const objString = JSON.stringify(response.data);
      console.log("latest acknowledgement response:  "+objString);
      setDispAckMsg(response.data);
  }
  catch(err){
      console.log("coming to exce");
      console.log(err);
      setErrorMessage(err)
  }
}

    
    const showConfirmDialog = () => {
      return Alert.alert(
        "Are your sure?",
        "Are you sure you want to Acknowledge PO?",
        [
          {
            text: "Yes",
            onPress: () => {
              setShowAckBut(false);
              acknowledgePO();
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    };


    const getPodetailsApi = async ()=>{
        console.log('Entered into getPoDetails API:::'+ token);
        try{
        const response = await ezcAuthApi.post('/auth/po/poDetails',data,  {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        const objString = JSON.stringify(response.data);
        console.log("latest po details response:  "+objString);
         setResults(response.data);
    }
    catch(err){
        console.log("coming to exce");
        console.log(err);
        setErrorMessage(err)
    }
    }
    useEffect(()=>{
      getPodetailsApi();
    },[]);
   
    const renderItem = ({ item }) => {
      return (
        <View>
        <View style={styles.container}>
          <View>
          <View>
            <Text style={styles.header}>HEADER</Text>
          </View>
          <Text>PO No: {data.poNumber}</Text>
          <Text>Date: {item.DOC_DATE}</Text>
          <Text>Value: {item.DOC_VALUE}</Text>
          </View>
          </View>

        <View>
          <View style={styles.container}>
          <View>
            <Text style={styles.header}>ITEMS</Text>
          </View>
         <FlatList
        data={results.ITEMS}
        renderItem={({item}) => 
        <View style={styles.container}>
        <Text>Item : {item.POSITION}</Text>
        <Text>Material Code : {item.ITEM}</Text>
        <Text>Description : {item.ITEMDESCRIPTION}</Text>
        <Text>Qty : {item.ORDEREDQUANTITY}</Text>
        <Text>Plant : {item.PLANT}</Text>
        <Text>Uom : {item.UOMPURCHASE}</Text>
        <Text>Value: {item.NET_PRICE}</Text>
        </View>
      }
        keyExtractor={item => item.POSITION}
      />
    </View>
        </View>
        <View>

        <View>
                    
                    <View style={styles.button}>
                    {!showAckBut && <View style={styles.dispAckMsg}>
                    <Text style={{ color: '#ffffff' }}>{dispAckMsg}</Text>
                    </View>}
                    {showAckBut &&
                    <Button mode="contained" style={styles.button} onPress={showConfirmDialog}>Acknowledge</Button>
                    }
                    </View> 
                </View>

        
      </View>
    </View>
      );
    };
  
    return (
      <FlatList
        data={results.HEADER}
        renderItem={renderItem}
        keyExtractor={(item) => item.DOC_CONDITION}
      />
    );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff', // Background color of the box
    borderRadius: 8, // Border radius to give rounded corners
    padding: 16, // Padding around the content inside the box
    shadowColor: '#000000', // Shadow color
    shadowOpacity: 0.3, // Shadow opacity
    margin:2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android shadows
  },
  header:{
    fontSize:20,
    padding:10,
    fontWeight:'bold'
  },
  button:{
    fontSize:15,
    margin:10
  },  
  dispAckMsg: {
    backgroundColor: '#f15a24',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 4,
    width: 400
  },
});

export default PoDetailScreen;