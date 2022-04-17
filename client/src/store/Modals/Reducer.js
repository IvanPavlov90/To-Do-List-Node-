const initialState = {
  open: false,
  element: null,
};

export function modal (state = initialState, action) {
  switch (action.type) {
    case "open_modal":
      return {
        ...state,
        open: action.payload.open,
        element: action.payload.element,
      };
    case "close_modal":
      return {
        ...state,
        open: action.payload.open,
        element: action.payload.element,
      };
    default:
      return { ...state };
  }
}
