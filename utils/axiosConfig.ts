import axios from "axios";
import { getUser } from "./getUser";

const instance = axios.create({
  baseURL: "https://lubrytics.com:8443/nadh-api-crm",
});

instance.defaults.headers.common["Authorization"] = `Bearer ${
  getUser()?.token
}`;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (401 === error.response.status) {
      localStorage.setItem("userData", "");
      window.location.href = "/login";

      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
