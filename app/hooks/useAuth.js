import { useMutation } from "@tanstack/react-query";

import { useDispatch } from "react-redux"
import api from "../config/api.js";
import { login } from "../features/authSlice.js";
import toast from "react-hot-toast";



export const useAuth=(mode="login")=>{
    const dispatch=useDispatch();

    return useMutation({
        mutationFn:async (userData)=>{
            
            const endpoint=mode ==="login" ? "/api/users/login" :"/api/users/register"
            const response=await api.post(endpoint,userData)
            
            return response.data;
          
        },
        onSuccess:(data)=>{
           
            dispatch(login({user:data.user,token:data.token}))
             toast.success(data.message)
        },
       onError:(error)=>{
        toast.error(error.message)
       }
       
    })
}