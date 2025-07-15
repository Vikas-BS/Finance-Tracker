import api from "../../utils/axios";

export const AuthExp ={
    async getExpense (){
        return api.get("/api/expense")
    },

    async addExpense(data) {
        return api.post("/api/expense",data)
    }

}