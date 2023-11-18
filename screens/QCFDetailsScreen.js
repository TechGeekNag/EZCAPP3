import React,{useState,useEffect,useContext} from 'react';
import { View, StyleSheet,FlatList,Alert } from 'react-native';
import { Button, Text, TextInput} from 'react-native-paper';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';
import { useNavigation } from '@react-navigation/native';
//import jsonData from '../api/data.json';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


const QCFDetailsScreen = ({route}) => {
  const navigation=useNavigation();
  const[header,setHeader] = useState([]);
  const {data} = route.params;
  const jsonData ='['+ JSON.stringify(data)+']';
  console.log('data in QCF API::'+jsonData);
    const [results, setResults]=useState([]);
    const [errorMessage,setErrorMessage]=useState('');
    const {token} = useContext(AuthContext);
    const [showApproveBut, setShowApproveBut] = useState(true);
    const [dispMsg, setDispMsg] = useState('');
    
    const approvePO = async ()=>{
        console.log('Entered into approvePO API:::');
        setShowApproveBut(false);
        //setDispMsg('Approved Successfully');
       
        const bodyData={	"collectiveNumber"	:data.qcfNumber,
        "status":data.status,"template":data.template,"currentStep":data.currentStep,"modifiedBy":data.modifiedBy
      }
        try{
        const response = await ezcAuthApi.post('/auth/qcf/approve',bodyData,  {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        const objString = JSON.stringify(response.data);
        console.log("latest qcf Approval response:  "+objString);
        setDispMsg(response.data);
    }
    catch(err){
        console.log("coming to exce");
        console.log(err);
        setErrorMessage(err)
    }
  }
   
  const getQCFApi = async ()=>{
    console.log('Entered into getQCF API:::'+ token);
    const inputData = {
       
      "collectiveNumber"  :data.qcfNumber
      };
    try{
    const response = await ezcAuthApi.post('/auth/qcf/qcfDetails',inputData,  {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    const objString = JSON.stringify(response.data);
    setResults(response.data);
    console.log("response:::res::" + objString);
}
catch(err){
    console.log("coming to exce");
    console.log(err);
    setErrorMessage(err)
}
  }


  useEffect(() => {
    const reloadListener = navigation.addListener('focus', () => {
        //getQCFApi();
      // Perform the necessary reloading logic here
      // Example: Fetch the latest data for the list
      console.log('List page is reloading');
    });

    return () => {
      reloadListener(); // Cleanup the listener when the component unmounts
    };
  }, [navigation]);

    useEffect(()=>{
       getQCFApi();
    },[]);
   
    const renderItem = ({ item }) => {
      return (
        <View>
        <View style={styles.container}>
          <View>
          <View>
            <Text style={styles.header}>HEADER</Text>
          </View>
          <Text>  QCF No: {data.qcfNumber}</Text>
          <Text>  Name of the Party: {item.EU_FIRST_NAME}</Text>
          <Text>  Quotation Reference Number : {item.ERH_RFQ_NO}</Text>
          <Text>  Payment Terms: {item.ERH_PAYMENT_TERMS}</Text>
          <Text>  Inco Terms : {item.ERH_INCO_TERMS1}</Text>
          <Text>  Value: {data.finalValue}</Text>
          </View>
          <View>
            <Text style={styles.header}>ITEMS</Text>
          </View>
          <View style={[styles.container,(item.ERH_STATUS == 'S') ? styles.bgcolorGreen : styles.bgColorWhite]}>
        <Text style={styles.text}> Item : {item.ERD_LINE_NO}</Text>
        <Text> Material Code : {item.ERD_MATERIAL}</Text>
        <Text> Material Description : {item.ERD_MATERIAL_DESC}</Text>
        <Text> Present Price: {item.ERD_PRICE}<AntDesign name="arrowup" size={15} color="red" /></Text>
        <Text> Previous Price: {item.ERD_PRICE-5}</Text>
        </View>
          </View>
    </View>
      );
    };
  
    return (
      <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.EU_FIRST_NAME}
      />
        <View>
                    <View style={styles.button}>
                    {!showApproveBut && <View style={styles.dispMsg}>
                    <Text style={{ color: '#ffffff' }}>{dispMsg}</Text>
                    </View>}
                    {showApproveBut &&
                    <Button mode="contained" style={styles.button} onPress={approvePO}>Approve</Button>
                    }
                    </View> 
          </View>
      </View>
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
  bgcolorGreen:{
    backgroundColor:'green',
  },
  bgColorWhite:{
    backgroundColor:'#ffffff'
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
  dispMsg: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 4,
    width: 400
  },
  text:{
    //color:'white'
  }
});

export default QCFDetailsScreen;


