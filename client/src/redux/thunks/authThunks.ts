import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginUserData, LoginUserResponse, RegisterUserData, RegisterUserResponse} from "../states/authState.ts";
import axiosInstance from "../../api/axiosInstance.ts";
import {handleAxiosError} from "../../utils/handleAxiosError.ts";


const registerUser = createAsyncThunk<
    RegisterUserResponse,
    RegisterUserData,
    { rejectValue: any }
>(
    "auth/registerUser",
    async (userData, {rejectWithValue}) => {
        try {
          const response = await axiosInstance.post<RegisterUserResponse>(
            "/auth/register",
            userData
          );
          
            return response.data;
        } catch (error) {
            // Ensure we return the result of `handleAxiosError` to maintain correct return type
            return handleAxiosError<any>(error, rejectWithValue);
        }
    }
);


const loginUser = createAsyncThunk<
    LoginUserResponse,
    LoginUserData,
    { rejectValue: any }
>(
    "auth/loginUser",
    async (userData, {rejectWithValue}) => {
        try {
          const response = await axiosInstance.post<LoginUserResponse>(
            "/auth/login",
            userData
          );
          return response.data;
        } catch (error: any) {
          return handleAxiosError<any>(error, rejectWithValue);
        }
    }
);

export {registerUser, loginUser};
