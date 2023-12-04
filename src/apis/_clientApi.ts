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

  updateClient(id: string, params: any) {
    const url = "api/clients/" + id;
    return axios().put(url, params);
  },
};

export default _clientApi;
