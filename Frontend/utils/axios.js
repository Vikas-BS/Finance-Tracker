import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,
});
api.interceptors.response.use(
    (res) => res,
    (err) =>{
        if(err.response?.status === 401){
            toast.error("Unaothorized, redirecting....")
            windows.location.href ="/login";
        }
        return Promise.reject(err);
    }
);
export default api;