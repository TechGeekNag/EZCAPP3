import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet,TouchableOpacity,SafeAreaView,ScrollView,View,Text } from 'react-native';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';
import useResults from '../hooks/useResults';





const PoListScreen = ({navigation}) => {
    let [results1,errorMessage1]= useResults();
   const  [results, setResults]=useState(results1);
    let [errorMessage,setErrorMessage]=useState('');
 
    const {token} = useContext(AuthContext);
    console.log('Po List Screen results::::: '+JSON.stringify(results));



  const timestamp=1644148800000;
  console.log(new Date(timestamp).toDateString());
  
  const getPosApi = async ()=>{
    console.log('Entered into getPos API:::'+ token);
    const inputData = {
        "fromDate"  :"01/01/2022",
        "toDate"  :"11/11/2023",
        "status"  :"X",
        "vendor"  :""
      };
    try{
    const response = await ezcAuthApi.post('/auth/po/list',inputData,  {
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
        getPosApi();
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
            navigation.navigate('Details',{ data: {"poNumber"	:item.DOCNO,
	"compCode":item.EZPA_COMP_CODE,"purOrg":item.EZPA_PUR_ORG,"purGrp":item.PUR_GRP,"vendor":item.EXT1} })}>
    <Text style={styles.txt_name}>{item.DOCNO}</Text>
    <Text style={styles.txt_item}> 1000.00 INR </Text>
    </TouchableOpacity>
    </View>
                <View>
                        <Text style={styles.txt_item}>{new Date(item.DOCDATE).toDateString()} </Text>
                        <Text style={styles.txt_item}>Open</Text>
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
  });

export default PoListScreen;