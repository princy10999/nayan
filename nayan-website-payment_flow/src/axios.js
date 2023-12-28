import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  const authHeaders = JSON.parse(localStorage.getItem("auth-headers"));
  config.headers = { ...config.headers, ...authHeaders };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth-headers");
    //   window.location.href = `/userLogin`;
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
