export interface StatusData {
  [key: number]: string;
}

export const statusData: StatusData[] = [
  { 1: "Raw" },
  { 2: "Screening Call" },
  { "-4": "Client Canceled" },
  { 3: "Interview with NADH" },
  { 4: "Shortlisting" },
  { 5: "Submit to Client" },
  { 6: "Interview with Client - Round 1" },
  { 7: "Reference Check" },
  { 8: "Negotiation" },
  { 9: "Offer Accepted" },
  { 10: "Placement" },
  { 11: "Follow-up" },
  { "-2": "Rejected by NADH" },
  { "-1": "Candidate Declined" },
];

export const getStatusDataByKey = (key: number): string | undefined => {
  const statusObject = statusData.find((status) =>
    Object.keys(status).includes(key.toString())
  );
  return statusObject ? statusObject[key] : undefined;
};

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
    key: "type",
    type: "select",
  },
  {
    title: "Created on",
    key: "created",
    type: "date",
  },
  {
    title: "Status",
    key: "status",
    type: "select",
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
    title: "Primary Status",
    key: "priority_status",
  },
  {
    title: "Languages",
    key: "language",
  },
  {
    title: "Highest degree",
    key: "highest_education",
  },
  {
    title: "City",
    key: "location",
    type: "address",
  },
  {
    title: "Industry",
    key: "industry",
    type: "industry",
  },
  {
    title: "YOB",
    key: "yob",
    type: "number",
  },
  {
    title: "Activity",
    key: "flow_status",
  },
  {
    title: "Recent companies",
    key: "current_company",
  },
  {
    title: "Recent positions",
    key: "current_position",
  },
  {
    title: "Year of services",
    key: "industry_years",
    type: "number",
  },
  {
    title: "Year of management",
    key: "management_years",
    type: "number",
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
    key: "location",
    // type: "address",
  },
  {
    title: "Lead Consultant",
    key: "lead_consultants",
    type: "multiple_select",
  },
  {
    title: "Activity",
    key: "account_status",
  },
  {
    title: "Tax Code",
    key: "tax_code",
  },
  {
    title: "CPA",
    key: "cpa",
  },
  {
    title: "Industry",
    key: "industry",
    type: "industry",
  },
  {
    title: "Job(s)",
    key: "client_jobs",
    type: "number",
  },
  {
    title: "Type",
    key: "type",
    type: "select",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Contact Person's Name",
    key: "contact_person_name",
  },
  {
    title: "Contact Person's Title",
    key: "contact_person_title",
  },
  {
    title: "Updated by",
    key: "update_last_by",
    type: "select",
  },
  {
    title: "Updated on",
    key: "updated_on",
    type: "date",
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

export const rawColumnsByTable = (tableName: string) => {
  let rawColumns: any[] = [];
  switch (tableName) {
    case "UserTable":
      rawColumns = userColumns;
      break;
    case "CandidateTable":
      rawColumns = candidateColumns;
      break;
    case "ClientTable":
      rawColumns = clientColumns;
      break;
    case "JobTable":
      rawColumns = jobColumns;
      break;
  }

  return rawColumns;
};

export const getObjByKey = (
  objs: any[],
  key: string,
  data: string | number
) => {
  const obj = objs.find((obj) => obj[key] === data);
  return obj;
};

export const getColByKey = (cols: any[], key: string | number) => {
  return getObjByKey(cols, "key", key);
};

export const getSelectByValue = (selectData: any[], value: string | number) => {
  return getObjByKey(selectData, "value", value);
};
