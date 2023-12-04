import axios from "apis/axios";

const _clientApi = {
  getClients(params: any) {
    const url = "api/clients";
    return axios().get(url, { params });
  },

  getOneClient(id: string) {
    const url = "api/clients/" + id;
    return axios().get(url);
  },

  // updateUser(id: number, params: any) {
  //   const url = "api/users/" + id + "/password";
  //   return axios().put(url, { params });
  // },
};

export default _clientApi;
