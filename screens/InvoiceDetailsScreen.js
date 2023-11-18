import React,{useState,useEffect,useContext} from 'react';
import { View, StyleSheet,FlatList,Alert } from 'react-native';
import { Button, Text} from 'react-native-paper';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';
import { useNavigation } from '@react-navigation/native';
import InvoiceListScreen from './InvoiceListScreen';




const InvoiceDetailScreen = ({route}) => {
  const navigation=useNavigation();
  const {data} = route.params;
  console.log(data);
    const [results, setResults]=useState([]);
    const [errorMessage,setErrorMessage]=useState('');
    const {token} = useContext(AuthContext);
   
    const getInvoicedetailsApi = async ()=>{
        console.log('Entered into getPoDetails API:::'+ token);
        try{
        const response = await ezcAuthApi.post('/auth/inv/invoiceDet',data,  {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        const objString = JSON.stringify(response.data);
        console.log("latest inv details response:  "+objString);
         setResults(response.data);
    }
    catch(err){
        console.log("coming to exce");
        console.log(err);
        setErrorMessage(err)
    }
    }

    useEffect(()=>{
      getInvoicedetailsApi();
    },[]);
    
    var obj = response.data.ITEMDETAILS[0];
    response.data.PAYMENTDETAILS.push(obj);
    const renderItem = ({ item }) => {
      return (
        <View>
        <View style={styles.container}>
          <View>
          <View>
            <Text style={styles.header}>Header</Text>
          </View>
          <Text>InVoice Number: {data.invNumber}</Text>
          <Text>Creation: {item.INVOICENUMBER}</Text>
          <Text>Value: {item.POSITIONNUMBER}</Text>
          </View>
          </View>

        <View>
          <View style={styles.container}>
          <View>
            <Text style={styles.header}>Items</Text>
          </View>
         <FlatList
        data={results.ITEMDETAILS}
        renderItem={({item}) => 
        <View style={styles.container}>
        <Text>Item : {item.INVOICECURRENCY}</Text>
        <Text>Paid Amount : {item.PAIDAMOUNT}</Text>
        <Text>Inv Amt : {item.INVOICEDAMOUNT}</Text>
        <Text>No : {item.POSITIONNUMBER}</Text>
        <Text>Qty : {item.INVOICEDQUANTITY}</Text>
        </View>
      }
        keyExtractor={item => item.POSITIONNUMBER}
      />
    </View>
        </View>
        <View>

        <View>
                    
                
                </View>

        
      </View>
    </View>
      );
    };
    return (
      <FlatList
        data={results.PAYMENTDETAILS}
        renderItem={renderItem}
        keyExtractor={(item) => item.INVOICENUMBER}
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

export default InvoiceDetailScreen;