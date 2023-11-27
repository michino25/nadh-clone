import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Industry",
    dataIndex: "name",
  },
  {
    title: "Sector",
    dataIndex: "age",
  },
  {
    title: "Category",
    dataIndex: "address",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

const data: DataType[] = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: "John Brown",
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const defaultTitle = () => "Here is title";
const defaultFooter = () => "Here is footer";

export default function DataTable() {
  const tableColumns = columns.map((item) => ({ ...item }));

  const tableProps: TableProps<DataType> = {
    bordered: false,
    loading: false,
    size: "large",
    title: defaultTitle,
    showHeader: true,
    rowSelection: {},
    scroll: undefined,
    tableLayout: undefined,
  };

  return (
    <>
      <Table
        {...tableProps}
        pagination={{ position: ["none", "bottomRight"] }}
        columns={tableColumns}
        dataSource={data}
      />
    </>
  );
}
