import DataTable from "components/Table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iJob, iUser } from "utils/models";
import { formatDate } from "utils/format";
import { useNavigate } from "react-router-dom";
import { jobApi } from "apis/index";
import { jobColumns } from "_constants/index";

export default function JobsList({ userDetail }: { userDetail: iUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    console.log("Page changed:", page);
    setCurrentPage(page);
  };

  const pageSize = 10;

  const paginationOption = {
    pageSize,
    currentPage,
    handlePageChange,
    total,
  };

  const { data, status, isPending } = useQuery({
    queryKey: ["Jobs", userDetail?.id, currentPage],
    queryFn: async () =>
      await jobApi
        .getJobs({
          perPage: pageSize,
          page: currentPage,
          mapping_by_recruiters: userDetail?.id,
        })
        .then((res) => {
          setTotal(res.data.count);

          return res.data.data.map((job: iJob) => ({
            ...job,
            year: job.requirement.industry_years,
            industry: job.business_line[0]?.industry.name,
            end_date: formatDate(job.end_date, "ISOdate", "date"),
            salary: "Negotiation",
          }));
        }),
    enabled: userDetail?.id !== undefined,
  });

  useEffect(() => {
    console.log("Data status:", status);
    console.log("Data:", data);
  }, [data, status]);

  const createBtn = {
    handler: () => {
      navigate(`/job-add`);
    },
    title: "Create Job",
  };

  if (isPending) return <Skeleton active />;

  return (
    data && (
      <DataTable
        titleTable={`Jobs List`}
        createBtn={createBtn}
        data={data}
        showDetail={() => {}}
        rawColumns={jobColumns}
        paginationOption={paginationOption}
      />
    )
  );
}
