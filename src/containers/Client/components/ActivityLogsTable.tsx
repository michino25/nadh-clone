import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatDate, formatName } from "utils/format";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
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
  },
  {
    title: "Field",
    dataIndex: "field",
    key: "field",
  },
  {
    title: "Detail",
    key: "tags",
    dataIndex: "tags",
    render: (_, { action, previous_value, current_value }: any) => (
      <span>
        {action} from:{" "}
        <span className="line-through font-medium">"{previous_value}"</span> to{" "}
        <span className="font-medium">"{current_value}"</span>
      </span>
    ),
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
    time: formatDate(item.time, "timestamp", "date&hour"),
    action: formatName(item.action),
    editBy: formatName(item.user.full_name),
  }));

  console.log(customData[0]);

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
