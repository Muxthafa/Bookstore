const initialState = {
  books: [],
  searchFlag: "false",
  sort: ""
};

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_BOOKS":
      return { ...state, books: payload.data, currentPage: payload.currentPage, numberOfPages: payload.numberOfPages };
    case "SET_SEARCHED_BOOKS":
      return { ...state, books: payload };
    case "SET_SEARCH_FLAG":
      return { ...state, searchFlag: payload };
    case "SET_SORT":
      return { ...state, sort: payload};
    default:
      return state;
  }
};