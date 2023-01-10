import axios from "axios";

// update
export function axiosPut(url, id, data) {
  const promise = axios.put(`${url}/${id}`, data);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}

// delete
export function axiosDelete(url, id) {
  const promise = axios.delete(`${url}/${id}`);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}

// get / read
export function axiosGet(url) {
  const promise = axios.get(`${url}`);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}

// post / create
export function axiosPost(url, data) {
  const promise = axios.post(url, data);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}
