import axios from 'axios';
import { toast } from 'react-toastify';
const domain = "localhost"
const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
   headers: { 'Content-Type': 'application/json' },
});
api.interceptors.response.use(
    (res) => res,
    (err) =>{
        if(err.response?.status === 401){
            toast.error("Unaothorized, redirecting....")
            window.location.href = "/login"
        }
        return Promise.reject(err);
    }
);

api.interceptors.request.use((config)=>{
    config.headers.domain = domain
    config.withCredentials = true ;
    return config
})
export default api;