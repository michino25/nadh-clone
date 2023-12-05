import axios from "axios";
import { iUserData } from "./models";
import { getStore, saveStore } from "./localStorage";

const instance = axios.create();

instance.defaults.headers.common["Authorization"] = `Bearer ${
  getStore("userData")?.token
}`;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (401 === error.response.status) {
      // reset token
      const user = getStore("userData") as iUserData;
      user.token = "";
      saveStore("userData", user);

      window.location.href = "/login";

      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
