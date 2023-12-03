import axios from "apis/axios";

const _jobApi = {
  getJobs(params: any) {
    const url = "api/jobs";
    return axios().get(url, { params });
  },
};

export default _jobApi;
