import { spinnerTypes } from "./ActionTypes";

export const showSpinner = (text) => ({
  type: spinnerTypes.showSpinner,
  payload: {
    loading: true,
    text: text,
  },
});

export const hideSpinner = () => ({
  type: spinnerTypes.hideSpinner,
  payload: {
    loading: false,
  },
});
