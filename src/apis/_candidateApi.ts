import axios from "apis/axios";

const _candidateApi = {
  getCandidates(params: any) {
    const url = "api/candidates";
    return axios().get(url, { params });
  },

  getOneCandidate(id: string) {
    const url = "api/candidates/" + id;
    return axios().get(url);
  },

  createCandidate(params: any) {
    const url = "api/candidates";
    return axios().post(url, { params });
  },

  updateCandidate(id: string, params: any) {
    const url = "api/candidates/" + id;
    return axios().put(url, { params });
  },
};

export default _candidateApi;
