import axios from "utils/axiosConfig";

export const axiosURL = (newBaseURL: string) => {
  if (newBaseURL) {
    axios.defaults.baseURL = newBaseURL;
  }
  return axios;
};

export default () => axiosURL("https://lubrytics.com:8443/nadh-api-crm");
