import axiosHelper from "../helper/axios";

let bookFetch = (token) => {
    let reqObj = {
      method: "get",
      URL: 'http://localhost:5000/books',
      headers: {
        "Content-type": "application/json",
        "authorization" : token
      },  
    }
    return axiosHelper.get(reqObj)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err
      });
};

let getBooks = (page, order) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "get",
    URL: `http://localhost:5000/books?page=${page}&sort=${order}`,
    headers: {
      "Content-type": "multipart/form-data",
      "authorization" : token
    },
  }
  return axiosHelper.get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err
    });
};

let getSearchedBooks = (searchTerm) => {
  let token = sessionStorage.getItem("token");
  let reqObj = {
    method: "get",
    URL: `http://localhost:5000/books/search?searchTerm=${searchTerm}`,
    headers: {
      "Content-type": "multipart/form-data",
      "authorization" : token
    },
  }
  return axiosHelper.get(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err
    });
};



export default {bookFetch, getBooks, getSearchedBooks}