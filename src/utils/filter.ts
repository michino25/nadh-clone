import { rawColumnsByTable } from "_constants/index";
import { getStore, saveStore } from "./localStorage";

export const initFilter = (tableName: string) => {
  saveStore(tableName, {
    col: rawColumnsByTable(tableName).map((column: any) => column.key),
  });
};

export const changeCustomColumn = (tableName: string, colData: any[]) => {
  const tableProp = getStore(tableName);
  tableProp.col = colData;
  saveStore(tableName, tableProp);
};
