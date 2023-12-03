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

export interface iJob {
  id: string;
  job_id: string;
  title: {
    key: number;
    label: string;
  };
  target_date: string;
  end_date: string;
  status: number;
  pic: any[];
  quantity: number;
  createdAt: string;
  // location: {};
  experience_level: number;
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
    review_date: string;
    future_prospect: string;
    converted_salary: {
      EUR: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
      };
      JPY: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
      };
      USD: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
      };
      VND: {
        id: number;
        name: string;
        salary: {
          to: number | null;
          from: number | null;
        };
      };
    };
  };
  client: {
    id: string;
    name: string;
    code: string;
    lead_consultants: {
      client_id: string;
      consultant_id: string;
      consultant: {
        id: string;
        full_name: string;
        user_name: string;
        key: string;
        label: string;
        user_id: number;
      };
    }[];
  };
  recruiters: {
    id: string;
    full_name: string;
    key: string;
    label: string;
    user_id: number;
  }[];
  consultants: {
    id: number;
    job_id: string;
    consultant_id: string;
  }[];
  related_users: {
    id: string;
    full_name: string;
    key: string;
    label: string;
    user_id: number;
  }[];
  candidate_flows: {
    id: string;
    status: number;
    previous_status: number[];
    candidate_id: string;
    createdAt: string;
    candidate: {
      id: string;
      candidate_id: string;
      full_name: string;
      histories: any[];
      // highest_education: {};
    };
  }[];
  status_count: {
    [key: string]: number;
  };
  recent_flow: {
    id: string;
    status: number;
    candidate_id: string;
    createdAt: string;
    flow: {
      id: number;
      count: number;
      creator: {
        id: string;
        role: {
          id: number;
          name: string;
        };
        full_name: string;
        user_name: string;
      };
      createdAt: string;
      current_status: number;
      previous_status: null;
    }[];
    updatedAt: string;
    candidate: {
      id: string;
      // highest_education: {};
      full_name: string;
      candidate_id: string;
      histories: any[];
    };
  };
  year: number;
  industry: string;
  salary: string;

  requirement: {
    // major: {};
    other: string;
    // degree: {};
    skills: any[];
    industry: {
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
    }[];
    languages: any[];
    soft_skills: any[];
    industry_years: number;
    functions_skills: any[];
    management_years: number;
  };

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
    category: {
      id: number;
      name: string;
      key: number;
      label: string;
    };
    primary: number;
  }[];
}

export interface iRole {
  id: number;
  name: string;
  obj_table: string;
  module_default: {
    list: {
      id: number;
      layout_key: string;
      name: string;
      list_action: {
        id: number;
        name: string;
        action_key: string;
      }[];
    }[];
  };
  action_default: {
    id: number;
    action_key: string;
    name: string;
    module_id: number;
  }[];
  status: number;
  created_at: string;
  updated_at: string;
}

export interface iUserData {
  token: string;
  user_sent: {
    id: string;
    user_id: number;
    email: string;
    full_name: string;
    user_name: string;
    avatar: null | any;
    type: number;
    createdAt: string;
    iat: number;
    exp: number;
    role: { name: string };
  };
}
