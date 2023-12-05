import { getStore, saveStore } from "./localStorage";

export const initFilter = (tableName: string) => {
  saveStore(tableName, { filter: {}, page: 1, col: [] });
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
