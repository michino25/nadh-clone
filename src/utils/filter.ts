import { rawColumnsByTable } from "_constants/index";
import { getStore, saveStore } from "./localStorage";

export const initFilter = (tableName: string) => {
  saveStore(tableName, {
    filter: {},
    page: 1,
    col: rawColumnsByTable(tableName).map((column: any) => column.key),
  });
};

export const changeCustomColumn = (tableName: string, colData: any[]) => {
  const tableProp = getStore(tableName);
  tableProp.col = colData;
  saveStore(tableName, tableProp);
};

export const changeOneFilter = (
  tableName: string,
  filterName: string,
  data: string,
  refetch: () => void
) => {
  const tableProp = getStore(tableName);
  tableProp.filter[filterName] = data;
  tableProp.page = 1;
  saveStore(tableName, tableProp);
  refetch();
};

export const removeOneFilter = (
  tableName: string,
  filterName: string,
  refetch: () => void
) => {
  const tableProp = getStore(tableName);
  delete tableProp.filter[filterName];
  tableProp.page = 1;
  saveStore(tableName, tableProp);
  refetch();
};

export const removeAllFilter = (tableName: string, refetch: () => void) => {
  const tableProp = getStore(tableName);
  tableProp.filter = {};
  tableProp.page = 1;
  saveStore(tableName, tableProp);
  refetch();
};

export const pageChange = (
  tableName: string,
  page: number,
  refetch: () => void
) => {
  const tableProp = getStore(tableName);
  tableProp.page = page;
  saveStore(tableName, tableProp);
  refetch();
};
