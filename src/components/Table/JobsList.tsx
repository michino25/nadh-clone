/* eslint-disable no-unused-vars */
import DataTable from "../DataTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iJob, iUser } from "../../../utils/models";
import { formatDate } from "../../../utils/format";
import { getUser } from "../../../utils/getUser";

const api = import.meta.env.VITE_API_URL;

const rawColumns = [
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

export default function JobsList({ userDetail }: { userDetail: iUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

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

  const { data, refetch, status, isPending } = useQuery({
    queryKey: ["Jobs", userDetail?.id],
    queryFn: () =>
      axios
        .get(
          api +
            `jobs?perPage=${pageSize}&page=${currentPage}&mapping_by_recruiters=${userDetail?.id}`,
          {
            headers: {
              Authorization: `Bearer ${getUser()?.token}`,
            },
          }
        )
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
    enabled: !!userDetail?.id,
  });

  useEffect(() => {
    refetch();
  }, [userDetail, refetch, currentPage]);

  useEffect(() => {
    console.log("Data status:", status);
    console.log("Data:", data);
  }, [data, status]);

  if (isPending) return <Skeleton active />;

  return (
    data && (
      <DataTable
        titleTable={`Jobs List`}
        data={data}
        setIdDetail={() => {}}
        showDetail={() => {}}
        rawColumns={rawColumns}
        paginationOption={paginationOption}
      />
    )
  );
}
