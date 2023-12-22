import axios from "apis/axios";

const _jobApi = {
  getJobs(params: any) {
    const url = "api/jobs";
    return axios().get(url, { params });
  },

  getOneJob(id: string) {
    const url = "api/jobs/" + id;
    return axios().get(url);
  },

  createJob(params: any) {
    const url = "api/jobs";
    return axios().post(url, params);
  },

  updateJob(id: string, params: any) {
    const url = "api/jobs/" + id;
    return axios().put(url, params);
  },
};

export default _jobApi;
