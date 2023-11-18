import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet,TouchableOpacity,SafeAreaView,ScrollView,View,Alert } from 'react-native';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';
import useResults from '../hooks/useResults';
import { Button, Text} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const QCFListScreen = ({navigation}) => {
  console.log(new Date().getMonth() + 1);
    let [results1,errorMessage1]= useResults();
   const  [results, setResults]=useState(results1);
    let [errorMessage,setErrorMessage]=useState('');
    const [showApproveBut, setShowApproveBut] = useState(true);
    const [dispMsg, setDispMsg] = useState('');
    const[approveFlag,setApproveFlag] = useState(false);
 
    const {token} = useContext(AuthContext);
    console.log('QCF List Screen results::::: '+JSON.stringify(results));

  



  
  const getQCFApi = async ()=>{
    console.log('Entered into getQCF API:::'+ token);
    const inputData = {
        "fromDate"  :"01/01/2022",
        "toDate"  :"30/11/2023",
        "status"  :"SUBMITTED",
        "vendor"  :""
      };
    try{
    const response = await ezcAuthApi.post('/auth/qcf/list',inputData,  {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    const objString = JSON.stringify(response.data);
    console.log("response:::" + objString);
    setResults(response.data);
}
catch(err){
    console.log("coming to exce");
    console.log(err);
    setErrorMessage(err)
}
  }


  useEffect(() => {
    const reloadListener = navigation.addListener('focus', () => {
        getQCFApi();
      // Perform the necessary reloading logic here
      // Example: Fetch the latest data for the list
      console.log('List page is reloading');
    });

    return () => {
      reloadListener(); // Cleanup the listener when the component unmounts
    };
  }, [navigation]);




  return (
    <SafeAreaView>
    <ScrollView horizontal={false}>
        {results.map((item,index)=>{
            return(
                <View style={styles.item_course} key={index}>
                  <View>
                   <TouchableOpacity 
            onPress={() => 
            navigation.navigate('QCFDetails',{ data: {"qcfNumber"	:item.ERH_COLLETIVE_RFQ_NO,
	"status":item.EWDHH_WF_STATUS,"finalValue":item.ERH_FINAL_VALUE,"plant":item.ERH_PLANT,"modifiedBy":item.EWDHH_MODIFIED_BY,
  "currentStep":item.EWDHH_CURRENT_STEP,"template":item.EWDHH_TEMPLATE_CODE} })}>
    <Text style={styles.txt_name}>{item.ERH_COLLETIVE_RFQ_NO}</Text>
    <Text style={styles.txt_item}> Plant : {item.ERH_PLANT}</Text>
     <Text style={styles.txt_item}>  No of Vend: {item.TOTVEND}  </Text>
    </TouchableOpacity>
    </View>
                <View>
                <Text style={styles.txt_name}> {item.ERH_FINAL_VALUE} INR </Text> 
                <Text style={styles.txt_item}>  Created By {item.EWDHH_CREATED_BY}  </Text> 
                <Text style={styles.txt_item}>  Status {item.EWDHH_WF_STATUS}  </Text> 
                        </View>
                    </View>
            )
        })}
    </ScrollView>
</SafeAreaView>
)
    }



const styles=StyleSheet.create({
  
  form:{
    padding : 15,
    // backgroundColor : "#e3e3e3",
    marginTop:10
},

txtClose:{
    fontSize:18,
    fontWeight : "bold",
    marginVertical : 10,
    textAlign : "right"
},
text_input:{
    padding :10,
    borderWidth :1,
    borderColor : "gray",
    borderRadius : 10,
    marginTop :10
},
header_container : {
    padding : 15,
    backgroundColor : "#eeeeee",
    flexDirection:"row",
    justifyContent : "space-between"
},
txt_main : {
    fontSize : 22,
    fontWeight : "bold"
},
item_course : {
    padding :15,
    borderBottomWidth: 1,
    borderBottomColor : "#e2e2e2",
    flexDirection : "row",
    justifyContent:"space-between"
},
txt_name : {
    fontSize : 18,
    marginTop : 5,
    fontWeight : "bold"
},
txt_item : {
    fontSize : 14,
    marginTop : 5
},
txt_enabled : {
    fontSize : 14,
    marginTop : 5,
    color:"green",
    fontWeight : "bold"
},
txt_disabled : {
    fontSize : 14,
    marginTop : 5,
    color:"green",
    fontWeight : "bold"
},
txt_del:{
    fontSize : 14,
    marginTop : 5,
    color:"red",
    fontWeight : "bold"
},
txt_edit:{
    fontSize : 14,
    marginTop : 5,
    color:"blue",
    fontWeight : "bold"
},
btnContainer : {
    display : 'flex',
    padding :15,
    backgroundColor : "#000",
    marginTop : 20,
    
},
btnNewContainer : {
    padding :10,
    backgroundColor : "#000",
},
textButton : {
    textAlign : "center",
    color : "#FFF"
},
button:{
    margin:3
},
dispMsg: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 4,
    width: 180
  },
  });

  export default QCFListScreen;




