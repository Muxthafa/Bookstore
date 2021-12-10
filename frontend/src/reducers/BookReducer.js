const initialState = {
  books: [],
};

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_BOOKS":
      return { ...state, books: payload };
    default:
      return state;
  }
};