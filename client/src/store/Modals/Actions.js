import { modalActionTypes } from "./ActionTypes";

export const showModal = (modalelement) => ({
  type: modalActionTypes.openModal,
  payload: {
    open: true,
    element: modalelement,
  },
});

export const hideModal = () => ({
  type: modalActionTypes.closeModal,
  payload: {
    open: false,
    element: null,
  },
});
