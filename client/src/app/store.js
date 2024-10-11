import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "../features/auth/authApiSlice";
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer
    },
    middleware: defaultMiddleware =>
        defaultMiddleware().concat(authApiSlice.middleware)
})