import Step from "../components/DataDisplay/Step";
import { Col, Row, Button, Form } from "antd";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/DataEntry/Input";
import DataSelect from "../components/DataEntry/Select";
import Birthday from "../components/DataEntry/Birthday";
import DataRadio from "../components/DataEntry/Radio";
import MultiSelect from "../components/DataEntry/MultiSelect";
import DynamicFormEmail from "../components/DataEntry/DynamicFormEmail";
import DynamicFormPhone from "../components/DataEntry/DynamicFormPhone";
import DynamicFormAddress from "../components/DataEntry/DynamicFormAddress";
import DataInputNumber from "../components/DataEntry/InputNumber";
import Notification from "../components/DataDisplay/Notification";

import { getUser } from "../../utils/getUser";

const api = import.meta.env.VITE_API_URL;

interface ItemProps {
  label: string;
  value: string;
}

const primaryStatus = ["Active", "Off - limit", "Blacklist", "Inactive"];
const gender = ["Male", "Female", "Complicated"];

const createSelectData = (data: string[]) => {
  const selectData: ItemProps[] = [];
  for (let i = 0; i < data.length; i++) {
    selectData.push({
      label: data[i],
      value: (i + 1).toString(),
    });
  }
  return selectData;
};

export default function CadidateAdd() {
  const navigate = useNavigate();

  const [notiShow, setNotiShow] = useState(false);
  const [notiData, setNotiData] = useState<{
    title: string;
    content: string;
  }>();

  const [value, setValue] = useState<string[]>([]);

  const { data: dataDegree } = useQuery({
    queryKey: ["degree"],
    queryFn: () =>
      axios
        .get(api + `property_values?property_name=degree`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        })
        .then((res) => {
          return res.data.data.map((item: any) => ({
            label: item.label,
            value: item.key + "_" + item.label,
          }));
        }),
  });

  const { data: dataPosition } = useQuery({
    queryKey: ["position"],
    queryFn: () =>
      axios
        .get(api + `property_values?property_name=position`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        })
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
      await axios.post(api + `candidates`, userData, {
        headers: {
          Authorization: `Bearer ${getUser()?.token}`,
        },
      });

      // success
      // console.log(res.data);
      setNotiData({
        title: "Create Candidate",
        content: "Create success",
      });
      setNotiShow(true);
      setTimeout(() => {
        navigate("/candidates");
      }, 1000);
    } catch (error) {
      // error
      // console.error("Create failed", error);
      setNotiData({
        title: "Create Candidate",
        content: "Create failed",
      });
      setNotiShow(true);
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
        city: { key: item.city.split("_")[0], label: item.city.split("_")[1] },
        country: {
          key: item.country.split("_")[0],
          label: item.country.split("_")[1],
        },
        district: {
          key: item.district.split("_")[0],
          label: item.district.split("_")[1],
        },
      })),
      dob: dob,
      gender: parseInt(values.gender),
      highest_education: {
        key: values.highest_education.split("_")[0],
        label: values.highest_education.split("_")[1],
      },
      nationality: [],
      phones: values.phones.map((item: any) => ({
        number: item,
        current: -1,
        phone_code: { key: 1280 },
      })),

      prefer_position: {
        positions: values.prefer_position.map((item: any) => ({
          key: item.split("_")[0],
          label: item.split("_")[1],
        })),
      },

      priority_status: parseInt(values.priority_status),
      relocating_willingness: parseInt(values.relocating_willingness),
    };
    createMutation.mutate(data);
    console.log("Received values of form: ", data);
  };

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/candidates"}>Candidates List</Link>
        <span> / Create Candidate</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Candidate</p>

      <Step
        current={0}
        data={[
          "Personal Information",
          "Skills and Industry",
          "Education and Certificat",
          "Working History",
          "Remunertion and Rewards",
          "Finish",
        ]}
      />

      <div className="p-4 my-6 bg-white rounded-lg">
        <p className="mb-4 font-bold text-lg">Personal Information</p>

        <Form layout="vertical" className="w-full" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Input label="First Name" name="first_name" required={true} />
            </Col>
            <Col span={12}>
              <Input label="Last Name" name="last_name" required={true} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input label="Middle Name" name="middle_name" />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Primary status"
                name="priority_status"
                data={createSelectData(primaryStatus)}
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
                name="relocating_willingness"
                defaultValue="1"
                data={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "-1" },
                ]}
              />
            </Col>
            <Col span={12}>
              <Input label="Source" name="source" required={true} />
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
            <Button className="mr-2">Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Notification
        status={notiShow}
        setStatus={setNotiShow}
        notiData={notiData}
      />
    </div>
  );
}
