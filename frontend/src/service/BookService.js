import axiosHelper from "../helper/axios";

let bookFetch = (token) => {
  let reqObj = {
    method: "get",
    URL: "http://localhost:5000/books",
    headers: {
      "Content-type": "application/json",
      authorization: token,
    },
  };
  return axiosHelper
    .get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let getBooks = (page, order) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "get",
    URL: `http://localhost:5000/books?page=${page}&sort=${order}`,
    headers: {
      "Content-type": "multipart/form-data",
      authorization: token,
    },
  };
  return axiosHelper
    .get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let getSearchedBooks = (searchTerm) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "get",
    URL: `http://localhost:5000/books/search?searchTerm=${searchTerm}`,
    headers: {
      "Content-type": "multipart/form-data",
      authorization: token,
    },
  };
  return axiosHelper
    .get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let getCartBooks = (token) => {
  let reqObj = {
    method: "get",
    URL: `http://localhost:5000/books/cart`,
    headers: {
      "Content-type": "multipart/form-data",
      authorization: token,
    },
  };
  return axiosHelper
    .get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let addCartBooks = (data) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "post",
    URL: `http://localhost:5000/books/add-to-cart`,
    headers: {
      authorization: token,
    },
    data: data,
  };
  return axiosHelper
    .post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let deleteCartBook = (id) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "delete",
    URL: `http://localhost:5000/books/cart/${id}`,
    headers: {
      authorization: token,
    },
  };
  return axiosHelper
    .get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let getCustomerDetails = () => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "get",
    URL: `http://localhost:5000/books/customer-details`,
    headers: {
      "Content-type": "multipart/form-data",
      authorization: token,
    },
  };
  return axiosHelper
    .get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let addCustomerDetails = (data) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "post",
    URL: `http://localhost:5000/books/customer-details`,
    headers: {
      authorization: token,
    },
    data: data,
  };
  return axiosHelper
    .post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let createOrder = (data) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "post",
    URL: `http://localhost:5000/books/order`,
    headers: {
      authorization: token,
    },
    data: data,
  };
  return axiosHelper
    .post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

let removeCart = () => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "delete",
    URL: `http://localhost:5000/books/cart`,
    headers: {
      authorization: token,
    },
  };
  console.log(reqObj);
  return axiosHelper
    .post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  bookFetch,
  getBooks,
  getSearchedBooks,
  getCartBooks,
  addCartBooks,
  deleteCartBook,
  getCustomerDetails,
  addCustomerDetails,
  createOrder,
  removeCart,
};
