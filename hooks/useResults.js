import {useState,useEffect,useContext} from 'react';
import ezcAuthApi from '../api/ezcAuthApi';
import { AuthContext } from '../store/auth-context';

export default ()=>{
    const [results, setResults]=useState([]);
    const [errorMessage,setErrorMessage]=useState('');
    const {token} = useContext(AuthContext);

    const getPosApi = async ()=>{
        console.log('Entered into getPos API:::'+ token);
        const inputData = {
            "fromDate"  :"01/01/2022",
            "toDate"  :"03/03/2023",
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
    useEffect(()=>{
        getPosApi();
    },[]);
    return [results,errorMessage];
  
}