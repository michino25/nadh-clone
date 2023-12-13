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
    return axios().post(url, params);
  },

  updateCandidate(id: string, params: any) {
    const url = "api/candidates/" + id;
    return axios().put(url, params);
  },

  createCandidateHistories(params: any) {
    const url = "api/candidate_histories";
    return axios().post(url, params);
  },

  updateCandidateHistories(id: string, params: any) {
    const url = "api/candidate_histories/" + id;
    return axios().put(url, params);
  },

  deleteCandidateHistories(id: string) {
    const url = "api/candidate_histories/" + id;
    return axios().delete(url);
  },
};

export default _candidateApi;
