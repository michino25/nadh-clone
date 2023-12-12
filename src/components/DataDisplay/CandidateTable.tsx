import { Flex, Button, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";

interface DataType {
  titleTable: string;
  createBtn: any;
  rawColumns: any[];
  data: any;
  editClick: (id: string) => void;
}

export default function CandidateTable({
  titleTable,
  createBtn,
  rawColumns,
  data,
  editClick,
}: DataType) {
  const header = (
    <Flex justify="space-between">
      <span className="text-xl font-bold">{titleTable}</span>

      <Flex gap="middle">
        <Button onClick={createBtn.handler}>{createBtn.title}</Button>
      </Flex>
    </Flex>
  );

  let columns: ColumnsType<DataType> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns.map((column: any) => ({
      ...column,
      dataIndex: column.key,
    }));

    columns.push({
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id: string) => (
        <Button
          type="text"
          onClick={() => {
            editClick(id);
            console.log("hello");
          }}
        >
          <EditOutlined />
        </Button>
      ),
    });
  }

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
        title={() => header}
        pagination={{
          position: ["none", "bottomRight"],
          defaultPageSize: 5,
          size: "default",
        }}
        scroll={{ x: true }}
        columns={tableColumns}
        dataSource={data}
      />
    </>
  );
}
