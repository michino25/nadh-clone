export const primaryStatus = [
  { label: "Active", value: "1" },
  { label: "Off - limit", value: "-1" },
  { label: "Blacklist", value: "-2" },
  { label: "Inactive", value: "5" },
];

export const primaryStatus2 = [
  { label: "Active", value: 9 },
  { label: "Blacklist", value: 11 },
  { label: "Off - limit", value: 10 },
  { label: "Inactive", value: 12 },
];

export const cpa = [
  { label: "Retained Plus", value: 1 },
  { label: "Retained Minus", value: 2 },
  { label: "New", value: 3 },
  { label: "Prospecting", value: 4 },
  { label: "Lost", value: 5 },
];

export const clientType = [
  { label: "Type A", value: 1 },
  { label: "Type B", value: 2 },
  { label: "Type C", value: 3 },
  { label: "Type D", value: 4 },
  { label: "Type T", value: 5 },
  { label: "Type L", value: 6 },
];

export const gender = ["Male", "Female", "Complicated"];

export interface iOption {
  label: string;
  value: string | number;
}

export const createSelectData = (data: string[]) => {
  const selectData: iOption[] = [];
  for (let i = 0; i < data.length; i++) {
    selectData.push({
      label: data[i],
      value: (i + 1).toString(),
    });
  }
  return selectData;
};
