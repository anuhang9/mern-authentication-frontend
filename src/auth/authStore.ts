import {create} from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'

interface AuthUser{
    userName: string;
    fullName: string;
    email: string;
    password: string;
    otpCode: string;
    isVerified: boolean;
}

interface AuthState{
    user: AuthUser | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    isCheckingAuth: boolean;
    signup: (userName: string, fullName: string, email: string, password: string)=>Promise<void>;
    emailverify: (otpCode: string)=>void;
    checkauth: ()=>Promise<void>;
    login: (userName: string, password: string)=>Promise<void>;
    logout: ()=>void;
    forgetpassword: (email: string)=>Promise<void>
}

export const useAuthStore = create<AuthState>((set)=>({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async(userName, fullName, email, password)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/signup`, {userName, fullName, email, password}, {withCredentials: true})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        }catch(error){
            let message = "Something went wrong.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            set({ error: message, isLoading: false });
            throw new Error(message); 
        }
    },

    emailverify: async(otpCode)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/email-verify`, {otpCode});
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        }catch(error){
            let message = "Something went wrong.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            set({ error: message, isLoading: false });
            throw new Error(message); 
        }
    },

    checkauth: async()=>{
        set({isCheckingAuth: true, error: null});
        try{
            const response = await axios.get(`${API_URL}/check-auth`, {withCredentials: true});
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
        }catch(error){
            let message = "Unknown error occurred while checking authentication.";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            set({
            error: message, isCheckingAuth: false, isAuthenticated: false,user: null,
            });
        }
    },

    login: async(userName, password)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/login`,{userName, password}, {withCredentials: true})
            set({user: response.data.user, isAuthenticated: true, error: null, isLoading: false})
        }catch(error){
            let message = "Something went wrong.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            set({ error: message, isLoading: false });
            throw new Error(message); 
        }
    },

    logout: async()=>{
        set({isLoading: true, error: null})
        try{
            await axios.post(`${API_URL}/logout`,{}, {withCredentials: true});
            set({user: null, isAuthenticated: false, error:null, isLoading: false})
        }catch(error){
            let message = "Something went wrong.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            set({ error: message, isLoading: false });
            throw new Error(message);
        }
    },

    forgetpassword: async(email)=>{
        set({isLoading: true, error: null})
        try{
            const response = await axios.post(`${API_URL}/forgot-password`,{email}, {withCredentials: true})
            set({user: response.data.user, isLoading: false, error: null})
        }catch(error){
            let message = "Something went wrong.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            set({ error: message, isLoading: false });
            throw new Error(message);
        }
    }
}))