import { Modal, Col, Row, Button, Form, notification } from "antd";

import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import Birthday from "components/DataEntry/Birthday";
import DataRadio from "components/DataEntry/Radio";
import MultiSelect from "components/DataEntry/MultiSelect";
import DynamicFormEmail from "components/DataEntry/DynamicFormEmail";
import DynamicFormPhone from "components/DataEntry/DynamicFormPhone";
import DynamicFormAddress from "components/DataEntry/DynamicFormAddress";
import DataInputNumber from "components/DataEntry/InputNumber";

import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createSelectData, gender, primaryStatus } from "_constants/index";
import { candidateApi, otherApi } from "apis/index";

export default function CandidateAddStep1({
  nextStep,
}: {
  nextStep: () => void;
}) {
  // const navigate = useNavigate();

  const [value, setValue] = useState<string[]>([]);

  const { data: dataDegree } = useQuery({
    queryKey: ["degree"],
    queryFn: async () =>
      await otherApi.getProperty("degree").then((res) => {
        return res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key + "_" + item.label,
        }));
      }),
  });

  const { data: dataPosition } = useQuery({
    queryKey: ["position"],
    queryFn: async () =>
      await otherApi
        .getProperty("position")
        .then((res) => {
          return res.data.data.map((item: any) => ({
            label: item.label,
            value: item.key + "_" + item.label,
          }));
        })
        .then((res) => res.splice(5)),
  });

  const createCandidate = async (userData: any) => {
    try {
      await candidateApi.createCandidate(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Candidate",
        description: "Create success.",
      });

      setTimeout(() => {
        nextStep();
        // navigate("/candidates");
      }, 1000);
    } catch (error: any) {
      // error
      // console.error("Create failed", error);
      notification.error({
        message: "Create Candidate",
        description: `Create failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createCandidate(formData),
  });

  const onFinish = (values: any) => {
    const dob =
      values.birthday.year && values.birthday.month && values.birthday.day
        ? `${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`
        : null;

    const data = {
      ...values,
      addresses: values.addresses.map((item: any) => ({
        address: item.address,
        city: item.city
          ? { key: item.city.split("_")[0], label: item.city.split("_")[1] }
          : null,
        country: item.country
          ? {
              key: item.country.split("_")[0],
              label: item.country.split("_")[1],
            }
          : null,
        district: item.district
          ? {
              key: item.district.split("_")[0],
              label: item.district.split("_")[1],
            }
          : null,
      })),
      dob: dob,
      gender: parseInt(values.gender),
      highest_education: values.highest_education
        ? {
            key: values.highest_education.split("_")[0],
            label: values.highest_education.split("_")[1],
          }
        : null,
      nationality: [],
      phones: values.phones.map((item: any) => ({
        number: item,
        current: -1,
        phone_code: { key: 1280 },
      })),

      prefer_position: values.prefer_position
        ? {
            positions: values.prefer_position.map((item: any) => ({
              key: item.split("_")[0],
              label: item.split("_")[1],
            })),
          }
        : null,

      priority_status: parseInt(values.priority_status),
      relocating_willingness: parseInt(values.relocating_willingness),
    };
    createMutation.mutate(data);
    // console.log("Received values of form: ", data);
  };

  const showConfirmSubmit = (values: any) => {
    Modal.confirm({
      title: "Confirm to create candidate",
      content: "Are you sure you want to create new candidate ?",
      onOk: () => onFinish(values),
    });
  };

  return (
    <Form layout="vertical" className="w-full" onFinish={showConfirmSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="First Name"
            placeholder="First Name"
            name="first_name"
            required={true}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Last Name"
            placeholder="Last Name"
            name="last_name"
            required={true}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="Middle Name"
            placeholder="Middle Name"
            name="middle_name"
          />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Primary status"
            placeholder="Primary status"
            name="priority_status"
            data={primaryStatus}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Birthday defaultValue="" />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataRadio
            name="gender"
            label="Gender"
            data={createSelectData(gender)}
          />
        </Col>
        <Col span={12}>
          <DataRadio
            name="martial_status"
            label="Marital Status"
            data={[
              { label: "Yes", value: 1 },
              { label: "No", value: -1 },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Ready to move"
            placeholder="Ready to move"
            name="relocating_willingness"
            defaultValue="1"
            data={[
              { label: "Yes", value: "1" },
              { label: "No", value: "-1" },
            ]}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Source"
            placeholder="Source"
            name="source"
            required={true}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DynamicFormEmail name="emails" required={true} />
        </Col>
        <Col span={12}>
          <DynamicFormPhone name="phones" required={true} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <DynamicFormAddress name="addresses" />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <MultiSelect
            label="Position Applied"
            name="prefer_position"
            required={false}
            value={value}
            setValue={setValue}
            options={dataPosition ? dataPosition : []}
          />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Highest Education"
            placeholder="Highest Education"
            name="highest_education"
            data={dataDegree ? dataDegree : []}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataInputNumber
            label="Industry Year of Services"
            placeholder={"0"}
            name="industry_years"
          />
        </Col>
        <Col span={12}>
          <DataInputNumber
            label="Year of Management"
            placeholder={"0"}
            name="management_years"
          />
        </Col>
      </Row>

      <Form.Item className="flex justify-end space-x-2">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
