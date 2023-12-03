import DataTable from "components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DashboardDetail from "containers/Dashboard/DashboardDetail";
import { formatDate, formatName } from "utils/format";
import { Skeleton } from "antd";
import { iUser } from "utils/models";
import { userApi } from "apis/index";

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

export default function DashboardUserList() {
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

  const [open, setOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<iUser | undefined>();

  const showDrawer = (idDetail: string) => {
    setOpen(true);
    if (idDetail) {
      const users: iUser[] = data.filter((user: iUser) => user.id === idDetail);
      setUserDetail(users[0]);
    }
  };
  const onClose = () => {
    setOpen(false);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["User", currentPage],
    queryFn: async () =>
      await userApi
        .getUsers({
          perPage: pageSize,
          page: currentPage,
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

  if (isPending) return <Skeleton active />;

  if (error) return <p>An error has occurred: {error.message}</p>;
  console.log(data);

  return (
    <>
      <DataTable
        titleTable={`System Users List`}
        createBtn={undefined}
        data={data}
        rawColumns={rawColumns}
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
