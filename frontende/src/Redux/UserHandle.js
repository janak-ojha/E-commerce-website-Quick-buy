import { authRequest,authSuccess, authFailed, authError, authLogout,stuffAdded } from "./UserSlice";
import axios from 'axios';

//user login
export const LoginUser = (fields) => async(dispatch) =>{
    const { email,password,role } = fields;
    console.log(email, password);
     dispatch(authRequest());
     try{
        let result = await fetch(`http://localhost:5000/login${role}`,{
            method: "post",
            body: JSON.stringify({ email, password,role }), // Fixed the payload
            headers: {
             "Content-Type": "application/json",
             },
        });
     result = await result.json();
      console.log(result);
      if(result.email){
      dispatch(authSuccess(result));
      }else{
      dispatch(authFailed(result.message));
    } 
     
     }
     catch (error) {
        console.log(error);
        dispatch(authError(error.message));
      }
}

//register user
export const RegisterUser = (fields) => async(dispatch) => {
    const {name, email, password,role} = fields;
    console.log(name,email,password,role);
    dispatch(authRequest());
    try {
      let result = await fetch(`http://localhost:5000/register${role}`,{
        method: "post",
        body:JSON.stringify({email,name,password,role}),
        headers:{
          "Content-Type":"application/json"
        }
      });
      result = await result.json();
      if(result.email){
        dispatch(authSuccess(result));
      }else{
        dispatch(authFailed(result.message));
      }
    } catch (error) {
      dispatch(authError(error.message));
    }
  }

   

  export const LogoutUser =() =>(dispatch) =>{
    try{
      dispatch(authLogout());
    }catch(error){
      console.log(error);

    }
  }

  export const addStuff = (address, fields) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`http://localhost:5000/${address}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        // Check for a message in the response to determine success or failure
        if (result.data.message) {
            dispatch(authFailed(result.data.message)); // Dispatch failure if message is present
        } else {
            dispatch(stuffAdded()); // Dispatch success action if no message indicates failure
        }
    } catch (error) {
        // Extract only serializable information from Axios error
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
        const errorStatus = error.response?.status || "Unknown status";
        
        // Dispatch an error action with the extracted error information
        dispatch(authError({ message: errorMessage, status: errorStatus }));
    }
};
