import {useState,useEffect,useContext} from 'react';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';

export default ()=>{
    const [results, setResults]=useState([]);
    const [errorMessage,setErrorMessage]=useState('');
    const {token} = useContext(AuthContext);

    const getPoinApi = async ()=>{
        console.log('Entered into Invoice List API:::'+ token);
        const inputData = {
            "status"  :"O",
            "compCode" :"VIPL"
          };
        try{
        const response = await ezcAuthApi.post('/auth/inv/list',inputData,  {
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
    useEffect(()=>{
        getPoinApi();
    },[]);
    return [results,errorMessage];
  
}