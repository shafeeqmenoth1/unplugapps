import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";


export const getItems =createAsyncThunk("sale/getItems",async()=>{
    const response = await axios.get('http://5.189.180.8:8010/item')
    return response.data
})

export const createSale =createAsyncThunk("sale/createSale",async(data,thunkAPI)=>{
    try {
        const response = await axios.post('http://5.189.180.8:8010/header/multiple', data)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
   
})
export const resetState = createAction("Reset_all");
const INITIAL_STATE = {
    items:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
   

}

const saleSlice = createSlice({
    name: "sale",
    initialState:INITIAL_STATE,
    extraReducers:{
        [getItems.pending]:(state,action)=>{
            state.isLoading = true;

        },
        [getItems.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.items = action.payload
        },
        [getItems.rejected]:(state,action)=>{
            state.isError = true;
            state.isLoading=false;
            state.isSuccess = false;
        },

        // Create Sales 

        [createSale.pending]:(state,action)=>{
            state.isLoading = true;
        },
        [createSale.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.createdSale = action.meta.arg
          
        },
        [createSale.rejected]:(state,action)=>{
            state.isError = true;
            state.isLoading=false;
       
          
        },

        [resetState]:()=> INITIAL_STATE

    }

})

export default saleSlice.reducer