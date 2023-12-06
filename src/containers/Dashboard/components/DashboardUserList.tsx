import DataTable from "components/Table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DashboardDetail from "containers/Dashboard/DashboardDetail";
import Tag from "components/Table/Tag";
import { formatDate, formatName } from "utils/format";
import { Skeleton } from "antd";
import { iUser } from "utils/models";
import { otherApi, userApi } from "apis/index";
import { getStore } from "utils/localStorage";
import { userColumns, userTable } from "_constants/index";
import { pageChange } from "utils/filter";

export default function DashboardUserList() {
  const [total, setTotal] = useState(0);

  const handlePageChange = (page: number) => {
    console.log("Page changed:", page);
    pageChange(userTable, page, refetch);
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

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["User", getStore(userTable).page],
    queryFn: async () =>
      await userApi
        .getUsers({
          perPage: pageSize,
          page: getStore(userTable).page,
          ...getStore(userTable).filter,
        })
        .then((res) => {
          setTotal(res.data.count);

          return res.data.data.map((user: iUser) => ({
            ...user,
            full_name: formatName(user.full_name),
            phone: (user.phone as { number: string }).number,
            type: (user.role as { name: string }).name,
            status: user.status ? "Active" : "Inactive",
            created: formatDate(user.createdAt, "ISOdate", "date"),
          }));
        }),
  });

  const { data: roleData } = useQuery({
    queryKey: ["Role"],
    queryFn: async () =>
      otherApi.getRoles().then((res) =>
        res.data.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      ),
  });

  const filterSelectData = {
    type: roleData,
    status: [
      { value: "-2", label: "Inactive" },
      { value: "1", label: "Active" },
    ],
  };

  console.log(filterSelectData.type);

  if (isPending) return <Skeleton active />;

  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <div className="flex-col w-full">
      <Tag
        tableName={userTable}
        filterSelectData={filterSelectData}
        refetch={refetch}
      />

      <DataTable
        titleTable={`System Users List`}
        tableName={userTable}
        refetch={refetch}
        filterSelectData={filterSelectData}
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
