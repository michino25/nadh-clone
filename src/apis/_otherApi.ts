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

  getProperty(property_name: string, value?: string) {
    const url = "api/property_values";
    return axios().get(url, {
      params: {
        property_name,
        ...(value && { value }),
      },
    });
  },

  getIndustry(params: any) {
    const url = "api/categories";
    return axios().get(url, { params });
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

  deleteFile(id: string) {
    const url = "file/" + id;
    return axiosURL("https://lubrytics.com:8443/nadh-mediafile").delete(url);
  },

  getCol(page: string) {
    const url = "api/user_pages?key_page=" + page;
    return axios().get(url);
  },

  changeCol(page: string, col: string[]) {
    const url = "api/user_pages";
    return axios().put(url, { data: col, key_page: page });
  },

  getOneProperty() {
    const url = "api/properties/default";
    return axios().get(url);
  },

  getExchangeCurrencies() {
    const url = "api/exchange_currencies";
    return axios().get(url);
  },

  getConflictTax(content: string) {
    const url = "api/clients-conflict?tax_code=" + content;
    return axios().get(url);
  },
};

export default _otherApi;
