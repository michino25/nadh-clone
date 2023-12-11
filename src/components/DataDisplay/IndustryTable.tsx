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
}: {
  data: any;
  deleteItem: (id: string) => void;
}) {
  const columns: ColumnsType<DataType> = [
    {
      title: "Primary",
      key: "id",
      dataIndex: "id",
      render: (id: string) => <Checkbox onChange={() => console.log(id)} />,
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
        pagination={{ position: ["none", "bottomRight"], defaultPageSize: 5 }}
        scroll={{ x: true }}
        columns={tableColumns}
        dataSource={dataShow}
      />
    </>
  );
}
