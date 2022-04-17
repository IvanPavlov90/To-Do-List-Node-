import { authType } from "./ActionTypes";

export const login = (username) => {
  return {
    type: authType.userLogin,
    payload: {
      username: username,
    },
  };
};

export const logout = () => {
  return {
    type: authType.userLogout,
  };
};
