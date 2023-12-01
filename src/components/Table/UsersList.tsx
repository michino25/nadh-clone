import DataTable from "components/DataTable";
import axios from "utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatDate, formatName } from "utils/format";
import { Skeleton } from "antd";
import { iUser } from "utils/models";
import { useNavigate } from "react-router-dom";

const rawColumns = [
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

export default function ClientsList() {
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

  const { isPending, error, data } = useQuery({
    queryKey: ["User", currentPage],
    queryFn: () =>
      axios
        .get("api/users", {
          params: {
            perPage: pageSize,
            page: currentPage,
          },
        })
        .then((res) => {
          setTotal(res.data.count);

          return res.data.data.map((user: iUser) => ({
            ...user,
            full_name: formatName(user.full_name),
            phone: (user.phone as { number: string }).number,
            role: (user.role as { name: string }).name,
            status: user.status ? "Active" : "Inactive",
            createdAt: formatDate(user.createdAt, "ISOdate", "date"),
          }));
        }),
  });

  const goDetail = (id: string) => {
    const users = data.filter((item: iUser) => item.id === id);
    navigate(`/user-detail/${users[0].user_id}`);
  };

  const createBtn = {
    handler: () => {
      navigate(`/user-add`);
    },
    title: "Create User",
  };

  if (isPending) return <Skeleton active />;

  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  return (
    <>
      <DataTable
        titleTable={`System Users List`}
        createBtn={createBtn}
        data={data}
        rawColumns={rawColumns}
        showDetail={goDetail}
        paginationOption={paginationOption}
      />
    </>
  );
}
