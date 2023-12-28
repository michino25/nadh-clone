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

  getProperty(property_name: string, value?: string, OptGroup?: boolean) {
    const url = "api/property_values";
    console.log(property_name, value, OptGroup);

    return axios().get(url, {
      params: {
        property_name,
        ...(OptGroup && { parent_id: "null" }),
        ...(value && { value }),
      },
    });
  },

  addProperty(property_name: string, value: string) {
    const url = "api/property_values";
    return axios().post(url, {
      name: property_name,
      value,
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

  addCandidateFlows(job_id: string, candidate_array: any) {
    const url = "api/candidate_flows";
    return axios().post(url, {
      job_id,
      candidate_array,
    });
  },

  addCandidateFlows2(candidate_id: string, job_array: any) {
    const url = "api/candidate_flows";
    return axios().post(url, {
      candidate_id,
      job_array,
    });
  },

  updateCandidateFlows(flowId: string, param: any, option?: string) {
    const url = "api/candidate_flows/" + flowId + (option ? "/" + option : "");
    return axios().put(url, param);
  },

  getCompare(candidate_id: string, job_id: string) {
    const url = `api/assessments/compare?candidate_id=${candidate_id}&job_id=${job_id}`;
    return axios().get(url);
  },

  getAccountDevelopments(id: string) {
    const url = "api/account_developments/" + id;
    return axios().get(url);
  },

  updateAccountDevelopments(accDevId: string, param: any, option?: string) {
    const url =
      "api/account_developments/" + accDevId + (option ? "/" + option : "");
    return axios().put(url, param);
  },

  createComment(params: any) {
    const url = "api/comments";
    return axios().post(url, params);
  },
};

export default _otherApi;
