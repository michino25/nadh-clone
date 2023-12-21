import DataTable from "components/Table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Tag as TagAntd } from "antd";
import { iJob, iUser } from "utils/models";
import { formatDate, formatName, formatPrice } from "utils/format";
import { useNavigate } from "react-router-dom";
import { jobApi } from "apis/index";
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

const customColumns: any[] = jobColumns;
customColumns[5] = {
  ...customColumns[5],

  render: (value: any) => {
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
  render: (value: any) => (
    <TagAntd color="geekblue">{formatName(value)}</TagAntd>
  ),
};
customColumns[10] = {
  ...customColumns[10],
  render: (value: any) => (
    <>
      {value.map((item: any) => (
        <TagAntd className="mb-2" color="purple">
          {formatName(item)}
        </TagAntd>
      ))}
    </>
  ),
};
customColumns[14] = {
  ...customColumns[14],
  render: (value: any) => {
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
            formatPrice(value[1]) + " - " + formatPrice(value[2])}
        </span>
      </>
    );
  },
};

export default function JobsList({ userDetail }: { userDetail: iUser }) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { getAllParams, pageChange } = useFilter();
  const [data, setData] = useState<any[]>([]);

  const handlePageChange = (page: number) => {
    console.log("Page changed:", page);
    pageChange(getAllParams(), page);
  };

  console.log(customColumns);

  const pageSize = 10;

  const paginationOption = {
    pageSize,
    handlePageChange,
    total,
  };

  useQuery({
    queryKey: ["Jobs", window.location.href],
    queryFn: async () =>
      await jobApi
        .getJobs({
          perPage: pageSize,
          ...getAllParams(),
          mapping_by_recruiters: userDetail?.id,
        })
        .then((res) => {
          setTotal(res.data.count);

          return res.data.data.map((job: iJob) => ({
            ...job,
            title: job.title.label,
            end_date: formatDate(job.end_date, "ISOdate", "date"),
            target_date: formatDate(job.target_date, "ISOdate", "date"),
            client: job.client.name,
            search_consultants:
              job.client.lead_consultants[0].consultant.full_name,
            location: Object.values(job.location).map((location: any) =>
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
            industry: job.business_line.map((business: any) =>
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
        })
        .then((res) => setData(res)),
    enabled: userDetail?.id !== undefined,
  });

  useEffect(() => {
    console.log("Data status:", status);
    console.log("Data:", data);
  }, [data, status]);

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

  // const filterSelectData = {
  //   update_last_by: userData,
  //   lead_consultants: userData,
  //   cpa: cpa,
  //   type: clientType,
  //   account_status: statusData2,
  //   status: primaryStatus2,
  // };

  return (
    <div className="flex-col w-full">
      <Tag tableName={jobTable} />
      {/* <Tag filterSelectData={filterSelectData} tableName={clientTable} /> */}

      {data && (
        <DataTable
          titleTable={`Jobs List`}
          tableName={jobTable}
          // filterSelectData={filterSelectData}
          createBtn={createBtn}
          data={data}
          showDetail={goDetail}
          rawColumns={customColumns}
          paginationOption={paginationOption}
          noFilter={userDetail?.id !== ""}
        />
      )}
    </div>
  );
}
