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

  const getPathname = () => location.pathname;

  const removeOneFilter = (params: any, filterName: string) => {
    if (filterName !== "page") {
      // console.log(filterName);

      delete params[filterName];
      delete params["page"];
    } else delete params[filterName];

    console.log(params);

    navigate({
      pathname: location.pathname,
      search: new URLSearchParams(params).toString(),
    });
  };

  const removeAllFilter = () => {
    // if (getAllParams()["page"])
    //   navigate({
    //     pathname: location.pathname,
    //     search: new URLSearchParams({
    //       page: getAllParams()["page"],
    //     }).toString(),
    //   });
    // else
    navigate({ pathname: location.pathname });
  };

  const changeOneFilter = (params: any, filterName: string, data: string) => {
    const filterParams = { ...params };

    delete filterParams["page"];
    filterParams[filterName] = data;

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
    getPathname,
  };
};

export default useFilter;
