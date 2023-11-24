/* eslint-disable no-unused-vars */
import DataTable from "../DataTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iNotification } from "../../../utils/models";
import { formatDate } from "../../../utils/format";
import { getUser } from "../../../utils/getUser";
import NotiDetail from "../Detail/NotiDetail";

const api = import.meta.env.VITE_API_URL;

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

  const [idDetail, setIdDetail] = useState("");
  const [open, setOpen] = useState(false);
  const [notiDetail, setNotiDetail] = useState<iNotification | undefined>();

  const showDrawer = () => {
    setOpen(true);
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

  const { data, refetch, status, isPending } = useQuery({
    queryKey: ["Notify"],
    queryFn: () =>
      axios
        .get(api + `notify_masters?perPage=${pageSize}&page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
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
    refetch();
  }, [refetch, currentPage]);

  useEffect(() => {
    if (idDetail) {
      const notis: iNotification[] = data.filter(
        (user: iNotification) => user.id === idDetail
      );
      setNotiDetail(notis[0]);
    }
  }, [idDetail, data]);

  useEffect(() => {
    console.log("Data status:", status);
    console.log("Data:", data);
  }, [data, status]);

  if (isPending) return <Skeleton active />;

  return (
    data && (
      <>
        <DataTable
          titleTable={`Notification List`}
          data={data}
          setIdDetail={setIdDetail}
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
