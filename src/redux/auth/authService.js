import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setLocalData } from "../../utils/helper";



export const loginRequest = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const { email, password, callback } = data;
            const response = await axiosInstance.post('/auth/login', { email: email, password: password });
            if (response.status === 200) {
                setLocalData(response.data.data.accessToken)
                callback();
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);


export const logoutRequest = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/logout');
            if (response.status === 200) {
                clearLocalData();
                return response.data;
            }
            throw new Error('Failed to logout');
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// Utility function to clear local storage data
const clearLocalData = () => {
    localStorage.removeItem('accessToken');
    // Remove any other stored data if necessary
};


export const createUserRequest = createAsyncThunk(
    "auth/createUser",
    async (data, thunkAPI) => {
        try {
            const { firstName, lastName, email, password, callback } = data;
            const response = await axiosInstance.post('/auth/register', { firstName, lastName, email, password });
            if (response.status === 201) {
                callback();
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);