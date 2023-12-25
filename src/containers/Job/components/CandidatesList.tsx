import { Link } from "react-router-dom";
import { Tag, Flex, Button, Table, Drawer, Descriptions, Modal } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { formatDate, formatName } from "utils/format";
import { useState } from "react";
import { experiences, getLabelByValue, statusData2 } from "_constants/index";

const rawColumns = [
  {
    title: "Candidate ID",
    key: ["candidate", "candidate_id"],
    render: (value: any, { candidate: { candidate_id } }: any) => (
      <Link to={"/candidate-detail/" + candidate_id}>{value}</Link>
    ),
  },
  {
    title: "Name",
    key: ["candidate", "full_name"],
    render: (value: any, { candidate: { candidate_id } }: any) => (
      <Link to={"/candidate-detail/" + candidate_id}>{formatName(value)}</Link>
    ),
  },
  {
    title: "Highest Degree",
    key: ["candidate", "highest_education", "label"],
  },
  {
    title: "Recent Position",
    key: ["candidate", "histories"],
    render: (_: any, { candidate }: any) => {
      const data = candidate.histories.map((item: any) => item.title.label);

      return data.map((item: any) => <p>{item}</p>);
    },
  },
  {
    title: "Previous Status",
    key: "previous_status",
    render: (value: any) =>
      value.map((item: any) => (
        <p>{"-> " + getLabelByValue(statusData2, item.toString())}</p>
      )),
  },
  {
    title: "Status",
    key: "status",
    render: (value: any) => getLabelByValue(statusData2, value.toString()),
  },
];

export default function CandidatesList({
  data,
  filterStatus,
  setFilterStatus,
}: any) {
  const [viewProfile, setViewProfile] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const candidate_flows = data.candidate_flows;

  console.log(filterStatus);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const header = (
    <Flex justify="end">
      <Flex gap="middle">
        <Button onClick={showModal} className="flex items-center">
          <PlusOutlined />
          Pick Candidate
        </Button>
      </Flex>
    </Flex>
  );

  let columns: ColumnsType<any> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns.map((column: any) => ({
      ...column,
      dataIndex: column.key,
    }));

    columns.push({
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (_: string, data) => {
        return (
          <Button
            type="text"
            onClick={() => {
              setViewProfile(data);
              showDrawer();
            }}
          >
            <EyeOutlined />
          </Button>
        );
      },
    });
  }

  const tagName = (tagName: string, tagContent: string) => (
    <Tag
      closable
      onClose={(e) => {
        e.preventDefault();
        setFilterStatus();
      }}
    >
      {tagName}: {tagContent}
    </Tag>
  );

  const tableProps: TableProps<any> = {
    bordered: false,
    loading: false,
    size: "middle",
    scroll: undefined,
    tableLayout: undefined,
  };

  return (
    <div>
      {filterStatus &&
        tagName(
          "Filter by previous status",
          getLabelByValue(statusData2, filterStatus.toString())
        )}
      <Table
        {...tableProps}
        title={() => header}
        pagination={{
          position: ["none", "bottomRight"],
          defaultPageSize: 5,
          size: "default",
        }}
        scroll={{ x: true }}
        columns={columns}
        dataSource={
          filterStatus
            ? candidate_flows.filter(
                (item: any) => item.status.toString() === filterStatus
              )
            : candidate_flows
        }
      />

      <Drawer
        title="Candidate Detail"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="ID">
            {viewProfile?.candidate.candidate_id}
          </Descriptions.Item>
          <Descriptions.Item label="Fullname">
            {formatName(viewProfile?.candidate.full_name)}
          </Descriptions.Item>
          <Descriptions.Item label="Create at">
            {formatDate(viewProfile?.createdAt, "ISOdate", "date&hour")}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {getLabelByValue(statusData2, viewProfile?.status.toString())}
          </Descriptions.Item>
          <Descriptions.Item label="Highest Education">
            {viewProfile?.candidate.highest_education.label}
          </Descriptions.Item>
          <Descriptions.Item label="Current Job">
            {viewProfile?.candidate.histories.map(
              (item: any) => item.title.label + ", "
            )}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>

      <Modal
        title="Pick Candidate"
        open={isModalOpen}
        okText="Pick"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Descriptions column={1} layout="horizontal">
          <Descriptions.Item label="Job Title">
            {data?.title.label}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {data?.department.label}
          </Descriptions.Item>
          <Descriptions.Item label="Industry">
            <div className="flex-col">
              {data?.business_line.map((item: any) => (
                <p>{item.industry ? item.industry.label : ""}</p>
              ))}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Experience Level">
            {getLabelByValue(experiences, data?.experience_level.toString())}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}
