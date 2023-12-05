import { Button, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

const App = ({
  data,
  deleteItem,
}: {
  data: any;
  deleteItem: (id: string) => void;
}) => {
  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Current Contact",
      dataIndex: "current",
      key: "current",
    },
    {
      title: "Mobile",
      dataIndex: "mobile_phone",
      key: "mobile_phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Job(s)",
      dataIndex: "jobs_count",
      key: "jobs_count",
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id: string) => (
        <Button type="text" onClick={() => deleteItem(id)}>
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  return <Table className="w-full" columns={columns} dataSource={data} />;
};

export default App;
