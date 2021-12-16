const initialState = {
  books: [],
  searchFlag: "false",
  sort: "",
  cart: [],
};

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: payload.data,
        currentPage: payload.currentPage,
        numberOfPages: payload.numberOfPages,
      };
    case "SET_SEARCHED_BOOKS":
      return { ...state, books: payload };
    case "SET_SEARCH_FLAG":
      return { ...state, searchFlag: payload };
    case "SET_SORT":
      return { ...state, sort: payload };
    case "SET_CART":
      return { ...state, cart: payload };
    case "SET_QUANTITY":
      let updatedCartQuantity = state.cart.map((item) => {
        if (item.book._id === payload.book) {
          item.quantity = payload.quantity;
        }
        return item;
      });
      return { ...state, cart: updatedCartQuantity };
    case "SET_REMOVE_BOOK":
      let updatedCart = state.cart.filter((item) => {
        console.log(item.book._id, payload);
        return item.book._id !== payload;
      });
      return { ...state, cart: updatedCart };
    case "SET_REMOVE_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};
