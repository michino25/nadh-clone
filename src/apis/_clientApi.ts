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

  createClient(params: any) {
    const url = "api/clients";
    return axios().post(url, params);
  },

  getContactPersons(id: string) {
    const url = "api/contact_persons/" + id;
    return axios().get(url);
  },

  createContactPersons(params: any) {
    const url = "api/contact_persons";
    return axios().post(url, params);
  },

  updateContactPersons(id: string, params: any) {
    const url = "api/contact_persons/" + id;
    return axios().put(url, params);
  },

  deleteContactPersons(id: string) {
    const url = "api/contact_persons/" + id + "/remove/";
    return axios().put(url);
  },
};

export default _clientApi;
