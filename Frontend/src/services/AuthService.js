import api from "../../utils/axios"
export const  AuthService ={

async login(email,password){
 return api.post("/api/auth/login",   
    {email,password},
 ) 
    

},
async logout(){
    return api.post("/api/auth/logout")
}

}