import api from "./index";

const User = {
  register: (userData) => {
    return api.post("/register", {
      ...userData,
    });
  },
  login: (credentials) => {
    return api.post("/login", {
      ...credentials,
    });
  },
};

export default User;
