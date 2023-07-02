import { configureStore } from "@reduxjs/toolkit";
import saleReducer from './saleSlice'


export const store = configureStore({
    reducer:{
        sale:saleReducer
    }
})