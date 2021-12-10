import axios from 'axios'

let post = (reqObj) => {
  return axios({
    method: reqObj.method,
    url: reqObj.URL,
    headers: reqObj.headers,
    data: reqObj.data,
  }).then((res) => {
    return res
  }).catch((err) => {
    throw err
  })
};

let get = (reqObj) => {
  return axios({
    method: reqObj.method,
    url: reqObj.URL,
    headers: reqObj.headers,
  }).then((res) => {
    return res
  }).catch((err) => {
    throw err
  })
};

export default {post, get}

