import api from "../../utils/axios";

export const AuthInc = {
  async getIncome() {
    return api.get("/api/income");
  },

  async addIncome(data) {
    return api.post("/api/income",data);
  },
};
