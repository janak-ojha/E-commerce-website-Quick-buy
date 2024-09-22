import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     status: "idle",
     loading: false,
     response: null,
     error: null,
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
}
});

export const {
    authRequest,
    authError,
    authFailed,
    authLogout,
    
            

}=userSlice.reducer;
