import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     status: "idle",
     loading: false,
     response: null,
     error: null,
     productData: [],
     particularProductData: null,
     responseProducts: null,
     listOfProductOfSingleSeller:[],
     currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authRequest: (state) =>{
            state.loading = true;
            state.status="loading";
        },
        authInitial: (state) =>{
            state.loading=false;
            state.status = "idle";
            state.response = null;
            state.error = null;
        },
        authLogout:(state) => {
            state.status = 'idle'
            state.loading = false;
            state.currentUser = null;
            state.response = null;
            state.error = null;
            localStorage.clear();
        },
        authFailed:(state,action) => {
            state.loading = false;
            state.status = "failed";
            state.response = action.payload;
        },
        authError:(state,action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload;
        },
        authSuccess:(state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));
            state.status = "success";
            state.response=null;
        },
        stuffAdded: (state) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
        authGetProductData: (state, action) => {
            state.loading = false;
            state.status = "success";
            state.productData = action.payload;
          },
        authGetSearchedProduct: (state, action) => {
            state.loading = false;
            state.status = "success";
            state.productData = action.payload;
          },  
        authGetParticularProductDetails: (state, action) => {
            state.loading = false;
            state.status = "success";
            state.particularProductData = action.payload;
        },
        authSuccessToSaveCategories: (state, action) => {
            state.loading = false;
            state.status = "success";
            state.categoriesList = action.payload;
          },
        authGettedProductOfSingleSeller: (state, action) => {
            state.listOfProductOfSingleSeller = action?.payload;
            state.status = "idle";
            state.loading = false;
          },  
        getProductsFailed: (state, action) => {
            state.responseProducts = action.payload;
            state.loading = false;
            state.error = null;
        },  


}       
});

export const {
    authRequest,
    authError,
    authFailed,
    authLogout,
    authSuccess,
    authInitial,
    stuffAdded,
    underControl,
    authGetProductData,
    authGetSearchedProduct,
    authGetParticularProductDetails,
    authSuccessToSaveCategories,
    authGettedProductOfSingleSeller,
    getProductsFailed,
    
    
            

}=userSlice.actions;
export const userReducer = userSlice.reducer;
