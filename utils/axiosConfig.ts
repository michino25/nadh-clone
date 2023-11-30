import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.example.com",
});

axios.defaults.baseURL = "https://lubrytics.com:8443/nadh-api-crm/api/";

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = JSON.parse(localStorage.getItem("keyCloak")).token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (401 === error.response.status) {
      window.location = "/login";

      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
