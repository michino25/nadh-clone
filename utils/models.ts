export interface iUser {
  id: string;
  key?: string;
  user_id?: number;
  full_name?: string;
  user_name?: string;
  phone?: string | { number: string };
  email?: string;
  dob?: string | null;
  status?: string;
  type?: number;
  gender?: number;
  district_id?: string | null;
  city_id?: string | null;
  country_id?: string | null;
  address?: string | null;
  token?: {
    token: string;
  };
  online?: any;
  properties?: any[];
  meta?: any;
  extra?: any;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  district?: any;
  city?: any;
  country?: any;
  role?: string | { name: string };
}

export interface iClient {
  id: string;
  user_id: number;
  full_name: string;
  user_name: string;
  phone: string;
  email: string;
  dob: null;
  status: string;
  meta: {
    lastUpdated: {
      user: { full_name: string };
      time: string;
    };
  };
  type: number;
  gender: number;
  district_id: null;
  city_id: null;
  country_id: null;
  address: { country: { label: string } };
  properties: any[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  district: null;
  country: null;
  role: string;
  city: string | null;
  lead_consultant: string;
  lead_consultants: { full_name: string }[];
  updated_by: string;
  updated_on: string;
  industry: string;
  business_line: { sector: { name: string } }[];
}

export interface iCandidate {
  id: string;
  candidate_id_int: number;
  career_status: number;
  createdAt: string;
  data_status: number;
  deletedAt: string | null;
  dob: string | null;
  extra: {
    martial_status: number;
  };
  first_name: string;
  gender: number;
  highest_education: {
    label: string;
    key: number;
  };
  industry_years: number;
  last_name: string;
  middle_name: string;
  management_years: number;
  nationality: {
    label: string;
    key: number;
  }[];
  prefer_position: {
    positions: {
      label: string;
      key: number;
    }[];
  };
  remuneration: {
    extra: string;
    salary: {
      to: number | null;
      from: number | null;
    };
    benefit: {
      bonus: number;
      extra: string;
      phone: number;
      laptop: number;
      no_holiday: number;
      phone_text: string;
      car_parking: number;
      laptop_text: string;
      lunch_check: number;
      health_cover: number;
      share_option: number;
      working_hour: number;
      car_allowance: number;
      over_thirteen: number;
      overtime_hour: number;
      pension_scheme: number;
      car_parking_text: string;
      lunch_check_text: string;
      health_cover_text: string;
      share_option_text: string;
      car_allowance_text: string;
      over_thirteen_text: string;
    };
    currency: {
      id: number;
      name: string;
    };
    notice_days: number | null;
    current_salary: number | null;
    converted_salary: {
      EUR: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
        current_salary: number | null;
      };
      JPY: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
        current_salary: number | null;
      };
      USD: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
        current_salary: number | null;
      };
      VND: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
        current_salary: number | null;
      };
    };
  };
  type: number;
  updatedAt: string;
  direct_reports: number;
  flow_status: number;
  candidate_id: string;
  code: string;
  age: {
    years: number;
    months: number;
    days: number;
  };
  full_name: string;
  priority_status: number;
  relocating_willingness: number;
  business_line: {
    industry: {
      id: number;
      name: string;
      key: number;
      label: string;
    };
    sector: {
      id: number;
      name: string;
      key: number;
      label: string;
    };
    primary: number;
  }[];
  languages: never[];
  addresses: {
    address: string | null;
    country: {
      key: number;
      label: string;
    };
  }[];
  emails: string[];
  phones: {
    number: string;
    current: number;
    phone_code: {
      key: number;
      label: string;
      extra: {
        code: string;
        dial_code: string;
      };
    };
  }[];
  previous_employments: never[];
  history_update: never[];
  skills: never[];
  functions_skills: never[];
  soft_skill: never[];
  overview_text: string;
  current_employments_old: never[];
  previous_employments_old: never[];

  companies: string;
  positions: string;
  current_employments: {
    organization: { label: string };
    title: { label: string };
  }[];
}
