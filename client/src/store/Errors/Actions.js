import { errorTypes } from "./ActionTypes";

export const error = (message) => {
  return {
    type: errorTypes.hasError,
    payload: {
      ErrorInfo: message,
    },
  };
};

export const noError = () => {
  return {
    type: errorTypes.noError,
  };
};
