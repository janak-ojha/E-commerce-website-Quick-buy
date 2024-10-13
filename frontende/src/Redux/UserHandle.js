import { json } from "react-router-dom";
import { authRequest,
         authSuccess, 
         authSuccessC,
         authInitial,
         authFailed, 
         authError, 
         authLogout,
         stuffAdded ,
         authGetParticularProductDetails,
         authGetProductData,
         authGetSearchedProduct,
         authSuccessToSaveCategories,
         authGettedProductOfSingleSeller,
         authCartProductLengthHandler,
} from "./UserSlice";
import axios from 'axios';

export const settingAllToInitial = () => async (dispatch) => {
  dispatch(authInitial());
};

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

// perticular product detail
// Action to fetch particular product details by ID
export const particularProductDetails = (productId) => async (dispatch) => {
  dispatch(authRequest());

  try {
    // Use the productId in the URL to match the backend route
    let result = await fetch(
      `http://localhost:5000/getPerticularProduct/${productId}`, // Here, productId replaces :id in the URL
      {
        method: "get", // GET method to retrieve data
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();

    // Check if the result contains a message (for error handling)
    if (result && !result.message) {
      dispatch(authGetParticularProductDetails(result)); // Dispatch success action
    } else {
      dispatch(authFailed(result?.message || "Product not found")); // Dispatch failure action
    }
  } catch (error) {
    console.log("Error fetching product:", error);
    dispatch(authError("An error occurred while getting product details")); // Dispatch error action
  }
};

// export const particularProductDetails = (productId) => async(dispatch) =>{
//   dispatch(authRequest());
//   try {
//     let result = await fetch(
//       `http://localhost:5000/getPerticularProduct/${productId}`,{
//         method:"post",
//         body:JSON.stringify({productId}),
//         headers:{
//           "Content-Type": "application/json",
//         }
//       }
//     );
//     result = await result.json();
//     console.log(result);
//     if(result)
//     {
//       dispatch(authGetParticularProductDetails(result));
//     }else{
//       dispatch(authFailed(result?.message));
//     }
//   } catch (error) {
//     console.log(error);
//     dispatch(
//       authError(
//         "an error occured while getting product detail"
//       )
//     )
    
//   }
// }

// to get all the prooducts
export const getProducts = () => async(dispatch) =>{
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/getProduct`,{
      method: "get",
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json()
    if(result)
    {
      dispatch(authGetProductData(result));
    }else{
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(
      authError(
        "error occurred during adding the product"
      )
    )
  }
}

//to find from categories
export const getSearchedProducts=(category) =>async(dispatch) =>{
  let key = category;
  dispatch(authRequest());
  try {
      let result = await fetch(`http://localhost:5000/getSearchedProduct`,{
        method:"post",
        body:JSON.stringify({key}),
        headers:{
          "Content-Type":"application/json",
        },
      });   
      result = await result.json();
      if(result?.length)
        {
          dispatch(authGetSearchedProduct(result));
        }else{
          dispatch(authFailed(result?.message));
        } 
  } catch (error) {
    dispatch(authError("Internal server error"));
    
  }
}

//to save catogories
export const setCategory = (categories) => async (dispatch) =>{
  dispatch(authRequest());
  try {
    dispatch(authSuccessToSaveCategories(categories))
  } catch (error) {
    console.log(error);
    dispatch(authError("failed to save categories"))
  }
}

//to get the searched product 
export const getSearchesProduct = (key) => async(dispatch)=>{
  dispatch(authRequest())
  try {
    let result = await fetch("http://localhost:5000/getSearchesProduct",{
      method:"post",
        body:JSON.stringify({key}),
        headers:{
          "Content-Type":"application/json",
        },
    })
    result = await result.json();
    if(result?.length){
      dispatch(authGetSearchedProduct(result));
    }else{
      dispatch(authFailed(result?.message))
    }
  } catch (error) {
    console.log(error);
    dispatch(authError("Internal server error "))
  }
}


// getting the product of seller
export const getProductOfSeller =(id) =>async(dispatch) =>{
  console.log(id);
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/getproducts/${id}`,
      {
        method:"get",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    result = await result.json();
    if(result?.length)
    {
      dispatch(authGettedProductOfSingleSeller(result))
    }
  } catch (error) {
    console.error("network error",error);
    dispatch(authError("network Error "));
  }
}

//save to cart
export const saveToCart = (fields) => async(dispatch) =>{
  try {
    let result=await fetch(`http://localhost:5000/saveToCart`,{
      method:"post",
      body: JSON.stringify({fields}),
      headers:{
        "Content-Type":"application/json",
      },
    });
    result = await result.json();
    
    if(result?.message === "Successfully added to the cart."){
      dispatch(authSuccessC(result.message));
    }else{
      authFailed("fsiled try again after some time");
    }
  } catch (error) {
    console.log("network Error",error);
    dispatch(authError("network Error"))
  }
}

//get product cart lenght
export const getCartProductLengthHandle = 
   (updatedLength) => async(dispatch) =>{
    console.log(updatedLength);
   
   try {
    console.log(updatedLength);
    dispatch(authCartProductLengthHandler(updatedLength))
   } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
   }
  }

