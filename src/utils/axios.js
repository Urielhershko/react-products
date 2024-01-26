import axios from "axios";
import server from "../config"

const axiosHttp = axios.create({
  baseURL: server.API_URL,
});

axiosHttp.interceptors.request.use(
    
  (config) => {
    const token =  localStorage.getItem('token')
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosHttp.interceptors.response.use(
  (response) => {
    //const url = response.config.url;

    //setLocalStorageToken(token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosHttp;