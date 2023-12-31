import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Col, Row, Button, Form, Modal, notification, Result } from "antd";
import CreateJobForm from "./components/CreateJobForm";
import { useState } from "react";
import { jobApi } from "apis/index";
import { AxiosError } from "axios";
import IndustryState from "components/ShareComponents/IndustryState";
import { iAddress, iDic, iIndustry } from "utils/models";

export default function JobAdd() {
  const [industry, setIndustry] = useState<iIndustry[]>([]);
  const [, setAddress] = useState<iAddress>();

  console.log(industry);

  const showConfirmSubmit = (values: iDic) => {
    console.log(values);

    Modal.confirm({
      title: "Confirm to create job",
      content: "Are you sure you want to create new job ?",
      onOk: () => onFinish(values),
    });
  };

  const onFinish = (values: iDic) => {
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
            key: values.address.country?.value?.toString(),
            label: values.address.country?.label,
          },
          ...(values.address.city && {
            city: {
              key: values.address.city?.value?.toString(),
              label: values.address.city?.label,
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

  const createClient = async (userData: iDic) => {
    try {
      const res = await jobApi.createJob(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Job",
        description: "Create success.",
      });

      setTimeout(() => {
        Modal.success({
          title: "",
          centered: true,
          closeIcon: null,
          footer: null,
          maskClosable: false,
          content: (
            <Result
              status="success"
              className="pl-0"
              title="Create job successful!"
              subTitle={"Client ID: " + res.data.job_id}
              extra={[
                <Button href={"/job-detail/" + res.data.job_id}>
                  View Detail
                </Button>,
                <Button href="/jobs" type="primary">
                  List Jobs
                </Button>,
              ]}
            />
          ),
        });
      }, 1000);
    } catch (error: unknown) {
      // error
      // console.error("Create failed", error);
      if (error instanceof AxiosError) {
        notification.error({
          message: "Create Job",
          description: `Create failed. ${
            error.response?.data[0].message || "Please try again."
          }`,
        });
      }
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: iDic) => createClient(formData),
  });

  const [saveBtn, setSaveBtn] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/clients"}>Jobs List</Link>
        <span> / Create Job</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Job</p>

      <div className="p-4 my-6 bg-white rounded-lg">
        <Form
          onValuesChange={() => {
            if (!firstLoad) setFirstLoad(true);
            else setSaveBtn(true);
          }}
          layout="vertical"
          className="w-full"
          onFinish={showConfirmSubmit}
        >
          <CreateJobForm setAddress={setAddress} />
          <Row gutter={16}>
            <Col span={24}>
              <IndustryState industry={industry} setIndustry={setIndustry} />
            </Col>
          </Row>

          {saveBtn && (
            <Form.Item className="flex justify-end space-x-2 mt-3">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
}
