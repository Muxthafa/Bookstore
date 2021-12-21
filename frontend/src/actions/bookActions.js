export const setBooks = (Books) => {
  return {
    type: "SET_BOOKS",
    payload: Books,
  };
};

export const setSearchedBooks = (Books) => {
  return {
    type: "SET_SEARCHED_BOOKS",
    payload: Books,
  };
};

export const setSearchFlag = (flag) => {
  return {
    type: "SET_SEARCH_FLAG",
    payload: flag,
  };
};

export const setSort = (order) => {
  return {
    type: "SET_SORT",
    payload: order,
  };
};

export const setCartBooks = (data) => {
  return {
    type: "SET_CART",
    payload: data,
  };
};

export const setQuantity = (data) => {
  return {
    type: "SET_QUANTITY",
    payload: data,
  };
};

export const setDeleteCart = (data) => {
  return {
    type: "SET_REMOVE_BOOK",
    payload: data,
  };
};

export const setEmptyCart = () => {
  return {
    type: "SET_REMOVE_CART",
  };
};
