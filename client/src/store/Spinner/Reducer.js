const initialState = {
  loading: false,
  text: "",
};

export function spinner(state = initialState, action) {
  switch (action.type) {
    case "show":
      return {
        ...state,
        loading: action.payload.loading,
        text: action.payload.text,
      };
    case "hide":
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}
