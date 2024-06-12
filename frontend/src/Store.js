import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js'
import adminAuthSlice from './slices/admin/adminAuthSlice.js';
import { apiSlice } from './slices/apiSlice.js';

const store=configureStore({
    reducer:{
        auth:authReducer,
        adminAuth:adminAuthSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddileware) => 
        getDefaultMiddileware().concat(apiSlice.middleware),
    devTools:true
})
export default store