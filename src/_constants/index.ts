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

export const random = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

export const userColumns = [
  {
    title: "ID",
    key: "user_id",
  },
  {
    title: "Full Name",
    key: "full_name",
  },
  {
    title: "Username",
    key: "user_name",
  },
  {
    title: "Phone",
    key: "phone",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Role",
    key: "role",
  },
  {
    title: "Created on",
    key: "createdAt",
  },
  {
    title: "Status",
    key: "status",
  },
];

export const candidateColumns = [
  {
    title: "ID",
    key: "candidate_id",
  },
  {
    title: "Name",
    key: "full_name",
  },
  {
    title: "Recent companies",
    key: "companies",
  },
  {
    title: "Recent positions",
    key: "positions",
  },
  {
    title: "Year of services",
    key: "industry_years",
  },
  {
    title: "Year of management",
    key: "management_years",
  },
];

export const clientColumns = [
  {
    title: "ID",
    key: "client_id",
  },
  {
    title: "Trade Name",
    key: "name",
  },
  {
    title: "City",
    key: "city",
  },
  {
    title: "Lead Consultant",
    key: "lead_consultant",
  },
  {
    title: "Tax Code",
    key: "tax_code",
  },
  {
    title: "Industry",
    key: "industry",
  },
  {
    title: "Jobs",
    key: "jobs_count",
  },
  {
    title: "Updated by",
    key: "updated_by",
  },
  {
    title: "Updated on",
    key: "updated_on",
  },
];

export const jobColumns = [
  {
    title: "ID",
    key: "job_id",
  },
  {
    title: "Expire Date",
    key: "end_date",
  },
  {
    title: "Industry",
    key: "industry",
  },
  {
    title: "Year of services",
    key: "year",
  },
  {
    title: "Salary Range",
    key: "salary",
  },
];

export const userTable = "UserTable";
export const candidateTable = "CandidateTable";
export const clientTable = "ClientTable";
export const jobTable = "JobTable";
