import React,{useContext} from 'react';
import { StyleSheet,TouchableOpacity,SafeAreaView,ScrollView,View,Text } from 'react-native';
import useinresults from '../hooks/useinresults';
import { useNavigation } from '@react-navigation/native';



const InvoiceListScreen = () => {
  const navigation=useNavigation();
  const [results,errorMessage]=useinresults();
  const timestamp=1644148800000;
  console.log(new Date(timestamp).toDateString());
  console.log('Invoice List Screen results::::: '+JSON.stringify(results));
  




  return (
    <SafeAreaView>
    <ScrollView horizontal={false}>
        {results.map((item,index)=>{
            return(
                <View style={styles.item_course} key={index}>
                  <View>
                   <TouchableOpacity 
            onPress={() => 
            navigation.navigate('Details',{ data: {"invNumber":item.INVOICENUMBER,
            "compCode":item.COMPCODE,"postDate":"06/17/2020","vendor":"3001003"} })}>
    <Text style={styles.txt_name}>{item.INVOICENUMBER}</Text>
    <Text style={styles.txt_item}>{item.AMOUNT}</Text>
    </TouchableOpacity>
    </View>
                <View>
                        <Text style={styles.txt_item}>{new Date(item.INVOICEDATE).toDateString()} </Text>
                        <Text style={styles.txt_item}>{item.TAX_CODE}  {item.GRNUMBER}</Text>
                        </View>
                    </View>
            )
        })}
    </ScrollView>
</SafeAreaView>
)

};



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

export default InvoiceListScreen;