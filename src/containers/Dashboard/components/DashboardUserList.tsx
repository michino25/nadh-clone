import DataTable from "components/Table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DashboardDetail from "containers/Dashboard/DashboardDetail";
import Tag from "components/Table/Tag";
import { formatDate, formatName } from "utils/format";
import { iUser } from "utils/models";
import { userApi } from "apis/index";
import { roleData, userColumns, userTable } from "_constants/index";
import useFilter from "src/hooks/useFilter";
import { notification } from "antd";

export default function DashboardUserList() {
  const [total, setTotal] = useState(0);
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

  const { isFetching, error, data } = useQuery({
    queryKey: ["all_users", window.location.href],
    queryFn: async () =>
      await userApi
        .getUsers({
          perPage: pageSize,
          ...getAllParams(),
        })
        .then((res) => {
          setTotal(res.data.count);
          return res;
        }),
    select: (res) =>
      res.data.data.map((user: iUser) => ({
        ...user,
        full_name: formatName(user.full_name),
        phone: (user.phone as { number: string }).number,
        type: (user.role as { name: string }).name,
        status: user.status ? "Active" : "Inactive",
        created: formatDate(user.createdAt, "ISOdate", "date"),
      })),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!navigator.onLine)
        notification.error({
          message: "Get Users",
          description: "No Internet",
        });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [window.location.href]);

  const filterSelectData = {
    type: roleData,
    status: [
      { value: "0", label: "Inactive" },
      { value: "1", label: "Active" },
    ],
  };

  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <div className="flex-col w-full">
      <Tag tableName={userTable} filterSelectData={filterSelectData} />

      <DataTable
        titleTable={`System Users List`}
        tableName={userTable}
        filterSelectData={filterSelectData}
        loading={isFetching}
        createBtn={undefined}
        data={data}
        rawColumns={userColumns}
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
    </div>
  );
}
