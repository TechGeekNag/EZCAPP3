
import ezcApi from '../api/ezcApi';




async function authenticate(email, password) {
      console.log('authenticate method');
      const data = JSON.stringify({ username: email,password:password,userDefaults:{}});
      console.log(data);
  customConfig = {
      headers: {
      'Content-Type': 'application/json',
      }
  };
    try{
      console.log('before api in auth.js');
      const response = await ezcApi.post('/user/authenticate',data,customConfig);
      console.log("response:::"+response);
      return response.data;
    }
    catch(err){
        console.log(err);
        return;
    }
  };



export function login(email, password) {
  return authenticate( email, password);
}