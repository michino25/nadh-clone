import { axiosURL } from "./axios";
import axios from "apis/axios";

const _otherApi = {
  getRoles() {
    const url = "api/roles";
    return axios().get(url);
  },

  getLocation(type: number, parent_id: string) {
    const url = "api/locations";
    return axios().get(url, {
      params: {
        type,
        parent_id,
        limit: 500,
      },
    });
  },

  getCountries() {
    const url = "api/locations";
    return axios().get(url, {
      params: {
        type: 4,
      },
    });
  },

  getProperty(property_name: string) {
    const url = "api/property_values";
    return axios().get(url, {
      params: {
        property_name,
      },
    });
  },

  getFile(obj_id: string, obj_table: string) {
    const url = "files";
    return axiosURL("https://lubrytics.com:8443/nadh-mediafile").get(url, {
      params: {
        obj_id,
        obj_table,
        page: 1,
        perPage: 10,
      },
    });
  },

  // getOneUser(id: string) {
  //   const url = "api/users/" + id;
  //   return axios().get(url);
  // },

  // logout() {
  //   const url = "logout";
  //   return axios().get(url);
  // },
};

export default _otherApi;
