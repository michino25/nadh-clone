import axios from "apis/axios";

const _userApi = {
  getUsers(params: any) {
    const url = "api/users";
    return axios().get(url, { params });
  },

  getOneUser(id: string) {
    const url = "api/users/" + id;
    return axios().get(url);
  },

  updateUser(id: number, params: any) {
    const url = "api/users/" + id + "/password";
    return axios().put(url, params);
  },

  login(params: any) {
    const url = "login";
    return axios().post(url, params);
  },

  logout() {
    const url = "logout";
    return axios().get(url);
  },
};

export default _userApi;
