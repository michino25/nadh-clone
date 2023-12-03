import axios from "axios";
import { iUserData } from "./models";

const instance = axios.create();

const getUser = (): iUserData | undefined => {
  const loggedInUser = localStorage.getItem("userData");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  } else null;
};

instance.defaults.headers.common["Authorization"] = `Bearer ${
  getUser()?.token
}`;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (401 === error.response.status) {
      // localStorage.setItem("userData", "");
      window.location.href = "/login";

      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
