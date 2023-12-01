/* eslint-disable no-unused-vars */
import DataTable from "components/DataTable";
import axios from "utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iNotification } from "utils/models";
import { formatDate } from "utils/format";
import NotiDetail from "components/Detail/NotiDetail";

const rawColumns = [
  {
    title: "ID",
    key: "notify_master_id",
  },
  {
    title: "Title",
    key: "title",
  },
  {
    title: "Content",
    key: "content",
  },
  {
    title: "Create At",
    key: "createdAt",
  },
];

export default function JobsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [open, setOpen] = useState(false);
  const [notiDetail, setNotiDetail] = useState<iNotification | undefined>();

  const showDrawer = (idDetail: string) => {
    setOpen(true);
    if (idDetail) {
      const notis: iNotification[] = data.filter(
        (user: iNotification) => user.id === idDetail
      );
      setNotiDetail(notis[0]);
    }
  };
  const onClose = () => {
    setOpen(false);
  };

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
    queryKey: ["Notify", currentPage],
    queryFn: () =>
      axios
        .get("api/notify_masters", {
          params: {
            perPage: pageSize,
            page: currentPage,
          },
        })
        .then((res) => {
          setTotal(res.data.count);
          return res.data.data.map((noti: iNotification) => ({
            ...noti,
            createdAt: formatDate(noti.createdAt, "ISOdate", "date&hour"),
          }));
        }),
  });

  useEffect(() => {
    console.log("Data status:", status);
    console.log("Data:", data);
  }, [data, status]);

  if (isPending) return <Skeleton active />;

  return (
    data && (
      <>
        <DataTable
          createBtn={undefined}
          titleTable={`Notification List`}
          data={data}
          showDetail={showDrawer}
          rawColumns={rawColumns}
          paginationOption={paginationOption}
        />
        {notiDetail && (
          <NotiDetail open={open} notiDetail={notiDetail} onClose={onClose} />
        )}
      </>
    )
  );
}
