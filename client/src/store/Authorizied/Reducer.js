const initialState = {
  isAuthentificated: false,
  username: "",
};

export const authorizied = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthentificated: true,
        username: action.payload.username,
      };
    case "logout":
      return {
        ...state,
        isAuthentificated: false,
        username: '',
      };
    default:
      return { ...state };
  }
};
