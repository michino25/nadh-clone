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
    dataIndex: "industry",
  },
  {
    title: "Sector",
    dataIndex: "sector",
  },
  {
    title: "Category",
    dataIndex: "category",
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

// const defaultTitle = () => "Here is title";
// const defaultFooter = () => "Here is footer";

export default function DataTable({ data }: { data: any }) {
  console.log(data);

  const dataShow: DataType[] = data.map((item: any, value: any) => ({
    key: value,
    industry: item.industry?.label,
    sector: item.sector?.label,
    category: item.category?.label,
  }));

  const tableColumns = columns.map((item) => ({ ...item }));

  const tableProps: TableProps<DataType> = {
    bordered: false,
    loading: false,
    size: "large",
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
        dataSource={dataShow}
      />
    </>
  );
}
