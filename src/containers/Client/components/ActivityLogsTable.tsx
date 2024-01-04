import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReactNode } from "react";
import { formatDate, formatName } from "utils/format";

interface DataType {
  key: string;
  action: string;
  previous_value: string;
  current_value: string;
  field: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Date & Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (value: string) => value.split("_")[0],
  },
  {
    title: "Field",
    dataIndex: "field",
    key: "field",
    render: (value: string) => <span className="font-semibold">{value}</span>,
  },
  {
    title: "Detail",
    key: "tags",
    dataIndex: "tags",
    width: "40%",
    render: (_, { action, previous_value, current_value, field }: DataType) => {
      const type = action.split("_")[1];
      let content: ReactNode = "";
      switch (type) {
        case "long":
          content = (
            <span>
              content of{" "}
              <span className="font-semibold text-gray-700">{field}</span>
            </span>
          );
          break;
        case "add":
          content = (
            <span>
              add{" "}
              <span className="font-semibold text-gray-700">
                "{current_value}"
              </span>
            </span>
          );
          break;
        case "remove":
          content = (
            <span>
              remove{" "}
              <span className="line-through font-semibold text-gray-700">
                "{previous_value}"
              </span>
            </span>
          );
          break;
        default:
          content = (
            <span>
              from{" "}
              <span className="line-through font-semibold text-gray-700">
                "{previous_value}"
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700">
                "{current_value}"
              </span>
            </span>
          );
      }
      return (
        <span>
          {action.split("_")[0]}: {content}
        </span>
      );
    },
  },
  {
    title: "By",
    dataIndex: "editBy",
    key: "editBy",
  },
];

export default function ActivityLogsTable({ data }: any) {
  const customData = data.map((item: any) => ({
    ...item,
    key: item.id,
    time: formatDate(item.time, "timestamp", "date&hour"),
    action: formatName(item.action),
    editBy: formatName(item.user.full_name),
  }));

  return (
    <Table
      columns={columns}
      pagination={{
        position: ["none", "bottomRight"],
        defaultPageSize: 5,
        size: "default",
      }}
      dataSource={customData}
      style={{ width: "100%" }}
    />
  );
}
