import axios from "axios";

// update
export function axiosPut(url, id, data, config) {
  const promise = axios.put(`${url}/${id}`, data, config);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}

// delete
export function axiosDelete(url, id, config) {
  const promise = axios.delete(`${url}/${id}`, config);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}

// get / read
export function axiosGet(url, config) {
  const promise = axios.get(`${url}`, config);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}

// post / create
export function axiosPost(url, data, config) {
  const promise = axios.post(url, data, config);
  const response = promise.then((response) => response.data);
  response.catch((error) => console.log(error));
  return response;
}
