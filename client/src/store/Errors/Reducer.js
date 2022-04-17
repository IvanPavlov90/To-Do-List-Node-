const initialState = {
  hasError: false,
  ErrorInfo: null,
};

export const errors = (state = initialState, action) => {
  switch (action.type) {
    case "error":
      return {
        ...state,
        hasError: true,
        ErrorInfo: action.payload.ErrorInfo,
      };
    case "no_error":
      return {
        ...state,
        hasError: false,
        ErrorInfo: null,
      };
    default:
      return { ...state };
  }
};
