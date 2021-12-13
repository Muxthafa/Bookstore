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

  export const setSearchFlag = (flag) =>{
    return {
      type: "SET_SEARCH_FLAG",
      payload: flag,
    };
  }

  export const setSort = (order) =>{
    return {
      type: "SET_SORT",
      payload: order,
    };
  }
