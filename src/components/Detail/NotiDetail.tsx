import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatDate, formatName } from "utils/format";
import { iNotification } from "utils/models";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "utils/axiosConfig";
import { useState } from "react";

export default function NotiDetail({
  open,
  notiDetail,
  onClose,
}: {
  open: boolean;
  notiDetail: iNotification;
  onClose: () => void;
}) {
  const [noti, setNoti] = useState(notiDetail);
  useQuery({
    queryKey: ["NotiDetail", notiDetail.notify_master_id],
    queryFn: () =>
      axios
        .get("api/notify_masters/" + notiDetail.notify_master_id)
        .then((res) => setNoti(res.data)),
  });

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Creator",
      span: 2,
      children: formatName(noti.creator.username),
    },
    {
      key: "2",
      label: "Created on",
      span: 2,
      children: formatDate(noti.createdAt, "ISOdate", "date"),
    },
    {
      key: "3",
      label: "Title",
      span: 3,
      children: noti.title,
    },
    {
      key: "4",
      label: "Content",
      span: 3,
      children: noti.content,
    },
    {
      key: "5",
      label: "Receiver",
      span: 3,
      children: noti.target.recievers_list
        ? noti.target.recievers_list
            .map((item: { full_name: string }) => formatName(item.full_name))
            .join(", ")
        : "",
    },
  ];

  console.log(notiDetail);

  return (
    <Drawer
      title={formatName("Notification Detail")}
      placement="right"
      width={600}
      closable={false}
      onClose={onClose}
      open={open}
      extra={
        <Button className="flex justify-center items-center" onClick={onClose}>
          <CloseOutlined />
        </Button>
      }
    >
      <div className="flex w-full p-5">
        <Descriptions title="Notification Detail" items={items} />
      </div>
    </Drawer>
  );
}
