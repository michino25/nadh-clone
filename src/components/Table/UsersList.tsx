import DataTable from "../DataTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DashboardDetail from "../Detail/DashboardDetail";
import { formatDate, formatName } from "../../../utils/format";
import { Skeleton } from "antd";
import { iUser } from "../../../utils/models";
import { getUser } from "../../../utils/getUser";

const api = import.meta.env.VITE_API_URL;

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

  const [idDetail, setIdDetail] = useState("");
  const [open, setOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<iUser | undefined>();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { isPending, refetch, error, data } = useQuery({
    queryKey: ["User"],
    queryFn: () =>
      axios
        .get(api + `users?perPage=${pageSize}&page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
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

  useEffect(() => {
    refetch();
  }, [refetch, currentPage]);

  useEffect(() => {
    if (idDetail) {
      const users: iUser[] = data.filter((user: iUser) => user.id === idDetail);
      setUserDetail(users[0]);
    }
  }, [idDetail, data]);

  if (isPending) return <Skeleton active />;

  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  return (
    <>
      <DataTable
        titleTable={`System Users List`}
        data={data}
        rawColumns={rawColumns}
        setIdDetail={setIdDetail}
        showDetail={showDrawer}
        paginationOption={paginationOption}
      />
      {userDetail && (
        <DashboardDetail
          open={open}
          userDetail={userDetail}
          onClose={onClose}
        />
      )}
    </>
  );
}