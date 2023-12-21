import { Button, Table, Checkbox } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

export default function IndustryTable({
  data,
  deleteItem,
  primaryItem,
  loading = false,
}: {
  data: any;
  deleteItem: (id: string) => void;
  primaryItem: (id: string) => void;
  loading?: boolean;
}) {
  const columns: ColumnsType<DataType> = [
    {
      title: "Primary",
      key: "primary",
      dataIndex: "primary",
      render: (primary: any, data: any) => {
        return (
          <Checkbox
            checked={primary === 1}
            onChange={() => primaryItem(data.id)}
          />
        );
      },
    },
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
      key: "id",
      dataIndex: "id",
      render: (id: string) => (
        <Button type="text" onClick={() => deleteItem(id)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const dataShow: DataType[] =
    data &&
    data.map((item: any, value: any) => ({
      key: value,
      id: item.id,
      primary: item.primary,
      industry: item.industry?.label,
      sector: item.sector?.label,
      category: item.category?.label,
    }));

  const tableColumns = columns.map((item) => ({ ...item }));

  const tableProps: TableProps<DataType> = {
    bordered: false,
    loading: false,
    size: "middle",
    scroll: undefined,
    tableLayout: undefined,
  };

  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ["none", "bottomRight"],
          defaultPageSize: 5,
          size: "default",
        }}
        scroll={{ x: true }}
        columns={tableColumns}
        loading={loading}
        dataSource={dataShow}
      />
    </>
  );
}
