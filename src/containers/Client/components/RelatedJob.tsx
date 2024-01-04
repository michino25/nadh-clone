import { getLabelByValue, statusData3 } from "_constants/index";
import { Modal, Table, Button, Form, Col, Row, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { formatDate, formatName } from "utils/format";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateJobForm from "containers/Job/components/CreateJobForm";
import { useQuery } from "@tanstack/react-query";
import { clientApi, jobApi } from "apis/index";
import { useMutation } from "@tanstack/react-query";
import IndustryState from "components/ShareComponents/IndustryState";
import { iIndustry } from "utils/models";
import { AxiosError } from "axios";

interface DataType {
  key: string;
  job_id: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "job_id",
    key: "job_id",
    render: (data: string, { job_id }: DataType) => (
      <Link type="link" className="font-medium" to={"/job-detail/" + job_id}>
        {data}
      </Link>
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (data: { label: string }, { job_id }: DataType) => (
      <Link type="link" className="font-medium" to={"/job-detail/" + job_id}>
        {data.label}
      </Link>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Contact Person",
    dataIndex: "pic",
    key: "pic",
    render: (data: { name: string }[]) => data[0]?.name,
  },
  {
    title: "Expire Date",
    dataIndex: "end_date",
    key: "end_date",
    render: (data: string) => formatDate(data, "ISOdate", "date"),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (data: number) => getLabelByValue(statusData3, data.toString()),
  },
  {
    title: "Search Consultant",
    dataIndex: "recruiters",
    key: "recruiters",
    render: (data: { full_name: string }[]) => formatName(data[0]?.full_name),
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (_: string, { job_id }: DataType) => (
      <Link type="link" className="font-medium" to={"/job-detail/" + job_id}>
        <EyeOutlined />
      </Link>
    ),
  },
];

export default function RelatedJob({ data, clientId, refetch }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [industry, setIndustry] = useState<iIndustry[]>([]);

  useQuery({
    queryKey: ["clientData"],
    queryFn: async () =>
      clientApi.getClients({}).then((res) => {
        return res.data.data.map((item: { id: string; name: string }) => ({
          value: item.id,
          label: formatName(item.name),
        }));
      }),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIndustry([]);
  };

  const onFinish = (values: any) => {
    const transformedObject = {
      quantity: values.quantity,
      type: parseInt(values.type),
      experience_level: parseInt(values.experience_level),
      business_line: industry.map((item) => ({
        ...(item.industry && { industry_id: item.industry.value }),
        ...(item.sector && { sector_id: item.sector.value }),
        ...(item.category && { category_id: item.category.value }),
        ...(item.primary && { primary: item.primary }),
      })),
      title: {
        key: values.title.split("_")[0],
        label: values.title.split("_")[1],
      },
      department: {
        key: values.department.split("_")[0],
        label: values.department.split("_")[1],
      },
      ...(values.address.country && {
        location: {
          country: {
            key: values.address.country.value.toString(),
            label: values.address.country.label,
          },
          ...(values.address.city && {
            city: {
              key: values.address.city.value.toString(),
              label: values.address.city.label,
            },
          }),
        },
      }),
      client_id: values.client_id,
      recruiters: [values.recruiters],
      related_users: values.related_users,
      ...(values.target_date.year && {
        target_date: `${values.target_date.year}-${values.target_date.month}-${values.target_date.day}`,
      }),
    };

    console.log("Received values of form: ", transformedObject);
    createMutation.mutate(transformedObject);
  };

  const createClient = async (userData: any) => {
    try {
      await jobApi.createJob(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Job",
        description: "Create success.",
      });

      refetch();
      handleClose();
    } catch (error: unknown) {
      // error
      // console.error("Create failed", error);
      if (error instanceof AxiosError)
        notification.error({
          message: "Create Job",
          description: `Create failed. ${
            error.response?.data[0].message || "Please try again."
          }`,
        });
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createClient(formData),
  });

  return (
    <div className="flex-col w-full">
      <div className="flex justify-end mb-3">
        <Button
          type="primary"
          onClick={showModal}
          className="flex items-center"
        >
          <PlusOutlined />
          New Job
        </Button>
      </div>

      <Table
        columns={columns}
        pagination={{
          position: ["none", "bottomRight"],
          defaultPageSize: 5,
          size: "default",
        }}
        dataSource={data}
        style={{ width: "100%" }}
      />

      <Modal
        title="Create Job"
        open={isModalOpen}
        onCancel={handleClose}
        destroyOnClose
        footer={null}
        width={800}
        centered
      >
        <Form
          layout="vertical"
          className="w-full"
          onFinish={onFinish}
          preserve={false}
        >
          <CreateJobForm defaultClient={clientId} />
          <Row gutter={16}>
            <Col span={24}>
              <IndustryState industry={industry} setIndustry={setIndustry} />
            </Col>
          </Row>

          <Form.Item className="flex justify-end space-x-2 mt-3">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
