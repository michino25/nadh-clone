/* eslint-disable no-unused-vars */
import DataTable from "../DataTable";
import { formatDate } from "../../../utils/format";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iRole } from "../../../utils/models";
import { getUser } from "../../../utils/getUser";

const api = import.meta.env.VITE_API_URL;

const rawColumns = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Created on",
    key: "created_at",
  },
  {
    title: "Status",
    key: "status",
  },
];

export default function RolesList() {
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
    queryKey: ["Notify"],
    queryFn: () =>
      axios
        .get(api + `roles`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        })
        .then((res) => {
          setTotal(res.data.total);
          return res.data.data.map((role: iRole) => ({
            ...role,
            status: role.status ? "Active" : "Inactive",
            created_at: formatDate(role.created_at, "ISOdate", "date"),
          }));
        }),
  });

  useEffect(() => {
    refetch();
  }, [refetch, currentPage]);

  useEffect(() => {
    console.log("Data status:", status);
    console.log("Data:", data);
  }, [data, status]);

  if (isPending) return <Skeleton active />;

  return (
    data && (
      <DataTable
        createBtn={undefined}
        titleTable={`Notification List`}
        data={data}
        showDetail={() => {}}
        rawColumns={rawColumns}
        paginationOption={paginationOption}
      />
    )
  );
}
