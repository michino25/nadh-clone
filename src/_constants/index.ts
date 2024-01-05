import { iIndustry } from "utils/models";

export interface StatusData {
  [key: number]: string;
}
export const typeJob = [
  { value: "1", label: "Full-time" },
  { value: "2", label: "Contract" },
  { value: "3", label: "Part-time" },
  { value: "4", label: "Internship" },
  { value: "5", label: "Temporary" },
  { value: "6", label: "Other" },
];

export const currencyData = [
  { value: "1", label: "USD" },
  { value: "2", label: "VND" },
  { value: "3", label: "JPY" },
  { value: "4", label: "EUR" },
];

export const experiences = [
  { label: "Internship Level", value: "1" },
  { label: "Entry Level", value: "2" },
  { label: "Associate Level", value: "3" },
  { label: "Mid-senior Level", value: "4" },
  { label: "Director", value: "5" },
  { label: "Executive", value: "6" },
];

export const statusData2 = [
  { label: "Raw", value: "1" },
  { label: "Screening Call", value: "2" },
  { label: "Interview with NADH", value: "3" },
  { label: "Shortlisting", value: "4" },
  { label: "Submit to Client", value: "5" },
  { label: "Interview with Client", value: "6" },
  { label: "Reference Check", value: "7" },
  { label: "Negotiation", value: "8" },
  { label: "Offer Accepted", value: "9" },
  { label: "Placement", value: "10" },
  { label: "Follow-up", value: "11" },
  { label: "Replacement", value: "12" },
  { label: "Candidate Declined", value: "-1" },
  { label: "Rejected by NADH", value: "-2" },
  { label: "Rejected by Client", value: "-3" },
  { label: "Client Canceled", value: "-4" },
];

export const statusData4 = [
  { label: "Create Client", value: "1" },
  { label: "Tele Marketing", value: "2" },
  { label: "Client Meeting", value: "3" },
  { label: "Proposal Sent", value: "4" },
  { label: "Follow Up", value: "5" },
  { label: "Sign Contract", value: "6" },
  { label: "Job Order Received", value: "7" },
];

export const statusData3 = [
  { label: "Lost", value: "-3" },
  { label: "Cancel", value: "-2" },
  { label: "Closed", value: "-1" },
  { label: "Opening", value: "1" },
  { label: "Done", value: "2" },
  { label: "Processing", value: "3" },
  { label: "Pending", value: "4" },
  { label: "Reopening", value: "6" },
];

export const highest_education = [
  { label: "Associate", value: "382" },
  { label: "Bachelor", value: "383" },
  { label: "Doctoral", value: "385" },
  { label: "fresher", value: "981" },
  { label: "God of life", value: "880" },
  { label: "Master", value: "384" },
  { label: "New degree", value: "997" },
  { label: "Specialist", value: "1050" },
  { label: "test 1", value: "897" },
  { label: "test 2", value: "898" },
];

export const roleData = [
  { label: "Researcher", value: "1" },
  { label: "Consultant", value: "2" },
  { label: "Marketing", value: "3" },
  { label: "Finance", value: "4" },
  { label: "Human resource", value: "5" },
  { label: "Manager", value: "6" },
  { label: "Principal", value: "7" },
  { label: "Partner", value: "8" },
];

export const primaryStatus = [
  { label: "Active", value: "1" },
  { label: "Off - limit", value: "-1" },
  { label: "Blacklist", value: "-2" },
  { label: "Inactive", value: "5" },
];

export const primaryStatus2 = [
  { label: "Active", value: "9" },
  { label: "Blacklist", value: "11" },
  { label: "Off - limit", value: "10" },
  { label: "Inactive", value: "12" },
];

export const cpa = [
  { label: "Retained Plus", value: "1" },
  { label: "Retained Minus", value: "2" },
  { label: "New", value: "3" },
  { label: "Prospecting", value: "4" },
  { label: "Lost", value: "5" },
];

export const years: iOption[] = [];
for (let year = 1960; year <= 2023; year++) {
  years.push({ label: year.toString(), value: year.toString() });
}

export const months = [
  { label: "Jan", value: "01" },
  { label: "Feb", value: "02" },
  { label: "Mar", value: "03" },
  { label: "Apr", value: "04" },
  { label: "May", value: "05" },
  { label: "Jun", value: "06" },
  { label: "Jul", value: "07" },
  { label: "Aug", value: "08" },
  { label: "Sep", value: "09" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
];

export const days: iOption[] = [];
for (let day = 1; day <= 31; day++) {
  const value = day.toString().padStart(2, "0");
  days.push({ value, label: value });
}

export const clientType = [
  { label: "Type A", value: "1" },
  { label: "Type B", value: "2" },
  { label: "Type C", value: "3" },
  { label: "Type D", value: "4" },
  { label: "Type T", value: "5" },
  { label: "Type L", value: "6" },
];

export const YNquestion = [
  { label: "Yes", value: "1" },
  { label: "No", value: "-1" },
];

export const gender = ["Male", "Female", "Complicated"];

export interface iOption {
  label: string;
  value: string | number;
}

export interface iOption2 {
  label: string;
  key: number;
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
    search: "user_id",
  },
  {
    title: "Full Name",
    key: "full_name",
    search: "full_name",
  },
  {
    title: "Username",
    key: "user_name",
    search: "user_name",
  },
  {
    title: "Phone",
    key: "phone",
    search: "phone",
  },
  {
    title: "Email",
    key: "email",
    search: "email",
  },
  {
    title: "Role",
    key: "type",
    search: "type",
    type: "select",
  },
  {
    title: "Created on",
    key: "created",
    search: "created",
    type: "date",
  },
  {
    title: "Status",
    key: "status",
    search: "status",
    type: "select",
  },
];

export const candidateColumns = [
  {
    title: "ID",
    key: "candidate_id",
    search: "candidate_id",
  },
  {
    title: "Name",
    key: "full_name",
    search: "full_name",
  },
  {
    title: "Primary Status",
    key: "priority_status",
    search: "priority_status",
    type: "select",
  },
  {
    title: "Languages",
    key: "language",
    search: "language",
    type: "multiple_select",
  },
  {
    title: "Highest degree",
    key: "highest_education",
    search: "highest_education",
    type: "multiple_select",
  },
  {
    title: "City",
    key: "location",
    search: "city",
    type: "address",
    ellipsis: true,
  },
  {
    title: "Industry",
    key: "industry",
    search: "industry_id",
    type: "industry",
    ellipsis: true,
  },
  {
    title: "YOB",
    key: "yob",
    search: "yob",
    type: "number",
  },
  {
    title: "Activity",
    key: "flow_status",
    search: "flow_status",
    type: "multiple_select",
    ellipsis: true,
  },
  {
    title: "Recent companies",
    key: "current_company",
    search: "current_company_text",
  },
  {
    title: "Recent positions",
    key: "current_position",
    search: "current_position_text",
  },
  {
    title: "Year of services",
    key: "industry_years",
    search: "industry_years",
    type: "number",
  },
  {
    title: "Year of management",
    key: "management_years",
    search: "management_years",
    type: "number",
  },
];

export const clientColumns = [
  {
    title: "ID",
    key: "client_id",
    search: "client_id",
  },
  {
    title: "Trade Name",
    key: "name",
    search: "name",
  },
  {
    title: "City",
    key: "location",
    search: "city",
    type: "address",
    ellipsis: true,
  },
  {
    title: "Lead Consultant",
    key: "lead_consultants",
    search: "lead_consultants",
    type: "multiple_select",
  },
  {
    title: "Activity",
    key: "account_status",
    search: "account_status",
    type: "select",
  },
  {
    title: "Tax Code",
    key: "tax_code",
    search: "tax_code",
  },
  {
    title: "CPA",
    key: "cpa",
    search: "cpa",
    type: "select",
  },
  {
    title: "Industry",
    key: "industry",
    search: "industry_id",
    type: "industry",
    ellipsis: true,
  },
  {
    title: "Job(s)",
    key: "client_jobs",
    search: "client_jobs",
    type: "number",
  },
  {
    title: "Type",
    key: "type",
    search: "type",
    type: "select",
  },
  {
    title: "Status",
    key: "status",
    search: "status",
    type: "select",
  },
  {
    title: "Contact Person's Name",
    key: "contact_person_name",
    search: "contact_person_name",
    width: "7%",
  },
  {
    title: "Contact Person's Title",
    key: "contact_person_title",
    search: "contact_person_title",
    width: "7%",
  },
  {
    title: "Updated by",
    key: "update_last_by",
    search: "update_last_by",
    type: "select",
  },
  {
    title: "Updated on",
    key: "updated_on",
    search: "updated_on",
    type: "date",
  },
];

export const jobColumns = [
  {
    title: "ID",
    key: "job_id",
    search: "job_id",
  },
  {
    title: "Title",
    key: "title",
    search: "title_text",
  },
  {
    title: "Quantity",
    key: "quantity",
    search: "quantity",
    type: "number",
  },
  {
    title: "Open Date",
    key: "target_date",
    search: "target_day",
    type: "date",
  },
  {
    title: "Expire Date",
    key: "end_date",
    search: "end_day",
    type: "date",
  },
  {
    title: "Status",
    key: "status",
    search: "status",
    type: "multiple_select",
  },
  {
    title: "Client",
    key: "client",
    search: "client",
    type: "multiple_select",
  },
  {
    title: "Search Consultant",
    key: "search_consultants",
    search: "search_consultants",
    type: "multiple_select",
  },
  {
    title: "Activity",
    key: "candidate_flows_status",
    search: "candidate_flows_status",
    type: "multiple_select",
  },
  {
    title: "Experience level",
    key: "experience_level",
    search: "experience_level",
    type: "multiple_select",
  },
  {
    title: "Mapping by",
    key: "mapping_by",
    search: "mapping_by",
    type: "multiple_select",
    width: "8%",
  },
  {
    title: "City",
    key: "location",
    search: "city",
    type: "address",
  },
  {
    title: "Industry",
    key: "industry",
    search: "industry_id",
    type: "industry",
  },
  {
    title: "Year of services",
    key: "industry_year",
    search: "industry_year",
    type: "number",
    width: "3%",
  },
  {
    title: "Salary Range",
    key: "salary",
    search: "salary",
    type: "currency",
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

export const getColByParam = (cols: any[], key: string | number) => {
  return getObjByKey(cols, "search", key);
};

export const getLabelByValue = (data: any[], value: string | number) => {
  return getObjByKey(data, "value", value)?.label;
};

export const getSelectByValue = (selectData: any[], value: string | number) => {
  return getObjByKey(selectData, "value", value);
};

export const convertKeytoValue = (data: any) => {
  return data && { value: data.key, label: data.label };
};

export const convertValuetoKey = (data: any, toString?: boolean) => {
  return (
    data && {
      key: toString ? data.value.toString() : data.value,
      label: data.label,
    }
  );
};

export const filterOption = (input: string, option?: iOption) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const getIndustryString = (data: iIndustry) => {
  if (!data) return undefined;
  let industry = "";
  if (data.industry?.label) industry += data.industry.label;
  if (data.sector?.label) industry += " / " + data.sector.label;
  if (data.category?.label) industry += " / " + data.category.label;
  return industry;
};
