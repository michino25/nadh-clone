import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getAllParams = () => {
    const allParams: any = {};
    new URLSearchParams(new URL(window.location.href).searchParams).forEach(
      (value, key) => {
        allParams[key] = value;
      }
    );
    return allParams;
  };

  const removeOneFilter = (filterName: string, params: any) => {
    if (filterName !== "page") {
      console.log(filterName);

      delete params[filterName];
      delete params["page"];
    } else delete params[filterName];

    navigate({
      pathname: location.pathname,
      search: new URLSearchParams(params).toString(),
    });
  };

  const removeAllFilter = () => {
    navigate({ pathname: location.pathname });
  };

  const changeOneFilter = (params: any, filterName: string, data: string) => {
    const filterParams = { ...params };

    if (filterName !== "page") {
      filterParams[filterName] = data;
      delete params["page"];
    } else filterParams[filterName] = data;

    navigate({
      pathname: location.pathname,
      search: new URLSearchParams(filterParams).toString(),
    });
  };

  const pageChange = (params: any, page: number) => {
    changeOneFilter(params, "page", page.toString());
  };

  return {
    getAllParams,
    removeOneFilter,
    removeAllFilter,
    changeOneFilter,
    pageChange,
  };
};

export default useFilter;
