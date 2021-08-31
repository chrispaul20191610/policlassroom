import api from "./index";

const User = {
  register: (userData) => {
    return api.post("/register", {
      ...userData,
    });
  },
};

export default User;
