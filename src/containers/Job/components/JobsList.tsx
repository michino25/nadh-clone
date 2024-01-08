import DataTable from "components/Table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Tag as TagAntd, notification } from "antd";
import { iIndustry, iJob, iUser } from "utils/models";
import { formatDate, formatName } from "utils/format";
import { useNavigate } from "react-router-dom";
import { clientApi, jobApi, userApi } from "apis/index";
import {
  experiences,
  getLabelByValue,
  jobColumns,
  jobTable,
  statusData2,
  statusData3,
} from "_constants/index";
import Tag from "components/Table/Tag";
import useFilter from "src/hooks/useFilter";
import type { ColumnsType } from "antd/es/table";
import numeral from "numeral";
import { AxiosResponse } from "axios";

const customColumns: ColumnsType = jobColumns;
customColumns[5] = {
  ...customColumns[5],

  render: (value: string) => {
    let color;
    switch (value) {
      case "Lost":
        color = "magenta";
        break;
      case "Cancel":
        color = "red";
        break;
      case "Closed":
        color = "default";
        break;
      case "Opening":
        color = "blue";
        break;
      case "Done":
        color = "green";
        break;
      case "Processing":
        color = "cyan";
        break;
      case "Pending":
        color = "purple";
        break;
      case "Reopening":
        color = "volcano";
        break;
    }
    return <TagAntd color={color}>{value}</TagAntd>;
  },
};
customColumns[7] = {
  ...customColumns[7],
  render: (value: string) => (
    <TagAntd color="geekblue">{formatName(value)}</TagAntd>
  ),
};
customColumns[10] = {
  ...customColumns[10],
  render: (value: string[]) => (
    <>
      {value.map((item: string) => (
        <TagAntd key={item} className="mb-2" color="purple">
          {formatName(item)}
        </TagAntd>
      ))}
    </>
  ),
};
customColumns[14] = {
  ...customColumns[14],
  render: (value: string[]) => {
    let color;
    switch (value[0]) {
      case "USD":
        color = "magenta";
        break;
      case "JPY":
        color = "orange";
        break;
      case "VND":
        color = "cyan";
        break;
      case "EUR":
        color = "blue";
        break;
      case "Negotiation":
        color = "volcano";
        break;
    }
    return (
      <>
        <TagAntd className="mb-2" color={color}>
          {value[0]}
        </TagAntd>{" "}
        <span>
          {value[1] &&
            value[2] &&
            numeral(value[1]).format("0,0") +
              " - " +
              numeral(value[2]).format("0,0")}
        </span>
      </>
    );
  },
};

export default function JobsList({ userDetail }: { userDetail: iUser }) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { getAllParams, pageChange } = useFilter();

  const handlePageChange = (page: number) => {
    console.log("Page changed:", page);
    pageChange(getAllParams(), page);
  };

  const pageSize = 10;

  const paginationOption = {
    pageSize,
    handlePageChange,
    total,
  };

  const allParams = {
    ...getAllParams(),

    ...(getAllParams()["city"] &&
      getAllParams()["city"].split(",").length > 0 && {
        country: getAllParams()["city"].split(",")[0],
        city: getAllParams()["city"].split(",")[1],
      }),

    ...(getAllParams()["salary"] &&
      getAllParams()["salary"].split(",").length > 0 && {
        ...(getAllParams()["salary"].split(",")[0] !== "-" && {
          salary_from: getAllParams()["salary"].split(",")[0],
        }),
        ...(getAllParams()["salary"].split(",")[1] !== "-" && {
          salary_to: getAllParams()["salary"].split(",")[1],
        }),
        currency: getAllParams()["salary"].split(",")[2],
      }),
  };
  delete allParams["salary"];

  const { data, isLoading } = useQuery({
    queryKey: ["all_jobs", window.location.href, userDetail.id],
    queryFn: async () =>
      await jobApi
        .getJobs({
          perPage: pageSize,
          ...allParams,
          ...(userDetail?.id && { mapping_by_recruiters: userDetail?.id }),
        })
        .then((res) => {
          setTotal(res.data.count);
          return res;
        }),
    enabled: userDetail?.id !== undefined,
    placeholderData: (previousData) => previousData,
    select: (res: AxiosResponse) => {
      return res.data.data.map((job: iJob) => ({
        ...job,
        title: job.title.label,
        end_date: formatDate(job.end_date, "ISOdate", "date"),
        target_date: formatDate(job.target_date, "ISOdate", "date"),
        client: job.client.name,
        search_consultants: job.client.lead_consultants[0].consultant.full_name,
        location: Object.values(job.location).map(
          (location: { label: string } | undefined) =>
            typeof location === "object" && location !== null
              ? location.label
              : ""
        ),
        industry_year: job.requirement.industry_years,
        salary:
          job?.remuneration?.salary?.from || job?.remuneration?.salary?.to
            ? [
                job?.remuneration?.currency.name,
                job?.remuneration?.salary?.from?.toFixed(0) || "0",
                job?.remuneration?.salary?.to?.toFixed(0) || "max",
              ]
            : ["Negotiation"],
        industry: job.business_line.map((business: iIndustry) =>
          typeof business === "object" && business !== null
            ? business.category?.name ||
              business.sector?.name ||
              business.industry?.name
            : ""
        ),
        mapping_by: job.related_users.map((item) => item.full_name),
        status: getLabelByValue(statusData3, job.status.toString()),
        experience_level: getLabelByValue(
          experiences,
          job.experience_level.toString()
        ),
        candidate_flows_status: getLabelByValue(
          statusData2,
          (
            job.candidate_flows[job.candidate_flows.length - 1]?.status || 1
          ).toString()
        ),
      }));
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!navigator.onLine)
        notification.error({
          message: "Get Jobs",
          description: "No Internet",
        });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [window.location.href]);

  const goDetail = (id: string) => {
    const jobs = data.filter((item: iJob) => item.id === id);
    navigate(`/job-detail/${jobs[0].job_id}`);
  };

  const createBtn = {
    handler: () => {
      navigate(`/job-add`);
    },
    title: "Create Job",
  };

  const { data: userData } = useQuery({
    queryKey: ["all_users"],
    queryFn: async () => userApi.getUsers({}),
    select: (res) =>
      res.data.data.map((item: { id: string; full_name: string }) => ({
        value: item.id,
        label: formatName(item.full_name),
      })),
  });

  const { data: clientData } = useQuery({
    queryKey: ["all_clients"],
    queryFn: async () => clientApi.getClients({}),
    select: (res) =>
      res.data.data.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: formatName(item.name),
      })),
  });

  const filterSelectData = {
    status: statusData3,
    experience_level: experiences,
    candidate_flows_status: statusData2,
    search_consultants: userData,
    mapping_by: userData,
    client: clientData,
  };

  return (
    <div className="flex-col w-full">
      {userDetail?.id === "" && (
        <Tag filterSelectData={filterSelectData} tableName={jobTable} />
      )}

      <DataTable
        titleTable={`Jobs List`}
        tableName={jobTable}
        filterSelectData={filterSelectData}
        loading={isLoading}
        createBtn={createBtn}
        data={data}
        showDetail={goDetail}
        rawColumns={customColumns}
        paginationOption={paginationOption}
        noFilter={userDetail?.id !== ""}
      />
    </div>
  );
}
