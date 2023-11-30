import { useParams, Link } from "react-router-dom";
import {
  Anchor,
  Col,
  Row,
  Button,
  Form,
  Timeline,
  Collapse,
  Skeleton,
} from "antd";
import type { CollapseProps } from "antd";
import { useEffect, useState } from "react";

import Table from "../components/DataDisplay/Table";
import Image from "../components/DataDisplay/Image";

import DataUpload from "../components/DataEntry/Upload";
import TextArea from "../components/DataEntry/TextArea";
import Input from "../components/DataEntry/Input";
import DataSelect from "../components/DataEntry/Select";
import Birthday from "../components/DataEntry/Birthday";
import DataRadio from "../components/DataEntry/Radio";
import DataDatePicker from "../components/DataEntry/DatePicker";
import MultiSelect from "../components/DataEntry/MultiSelect";
import BackToTopButton from "../components/BackToTopButton";
import axios from "axios";
import { getUser } from "../../utils/getUser";
import { useQuery } from "@tanstack/react-query";

const api = import.meta.env.VITE_API_URL;

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [];

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <div>
        <strong>J-000376 - Accounting Assistant</strong>
        <p>THI TEST 5 - C-000159</p>
      </div>
    ),
    children: (
      <Timeline
        items={[
          {
            color: "green",
            children: (
              <>
                <strong>Rejected by NADH</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
          {
            color: "green",
            children: (
              <>
                <strong>Placement</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  {
    key: "2",
    label: (
      <div>
        <strong>J-000376 - Accounting Assistant</strong>
        <p>THI TEST 5 - C-000159</p>
      </div>
    ),
    children: (
      <Timeline
        items={[
          {
            color: "green",
            children: (
              <>
                <strong>Rejected by NADH</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
          {
            color: "green",
            children: (
              <>
                <strong>Placement</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  {
    key: "3",
    label: (
      <div>
        <strong>J-000376 - Accounting Assistant</strong>
        <p>THI TEST 5 - C-000159</p>
      </div>
    ),
    children: (
      <Timeline
        items={[
          {
            color: "green",
            children: "Create a services site 2015-09-01",
          },
          {
            color: "green",
            children: (
              <>
                <strong>Solve initial network problems 1</strong>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </>
            ),
          },
        ]}
      />
    ),
  },
];

export default function Candidates() {
  const { id } = useParams();

  const [value, setValue] = useState<string[]>([]);

  const {
    data: candidateData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["candidate", id],
    queryFn: () =>
      axios
        .get(api + `candidates/${id}`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);

          return res.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, [refetch, id]);

  console.log(candidateData);

  if (isPending) return <Skeleton active />;

  return (
    <>
      <BackToTopButton />
      <div className="fixed z-40 bg-gray-100 top-24 left-0 right-0 px-8 pb-2 pt-4">
        <Anchor
          className=""
          direction="horizontal"
          items={[
            {
              key: "part-1",
              href: "#part-1",
              title: "Personal Information",
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "Skills and Industry",
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "Attachments",
            },
          ]}
        />
        <div className="py-1">
          <Link to={"/candidates"}>Candidates List</Link>
          <span>
            {" "}
            / {candidateData.candidate_id} -{" "}
            {candidateData.full_name.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex">
          <div className="flex-col w-2/3 space-y-4">
            <div id="part-1" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Overview</p>
              <TextArea
                label=""
                defaultValue={candidateData.overview_text_new}
              />
            </div>
            <div id="part-2" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Personal Information</p>

              <Form layout="vertical" className="w-full">
                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="First Name"
                      name="first_name"
                      required={true}
                      defaultValue={candidateData.first_name}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Last Name"
                      name="last_name"
                      required={true}
                      defaultValue={candidateData.last_name}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="Middle Name"
                      name="middle_name"
                      required={true}
                      defaultValue={candidateData.middle_name}
                    />
                  </Col>
                  <Col span={12}>
                    <DataSelect
                      label="Primary status"
                      name="status"
                      required={true}
                      defaultValue="active"
                      data={[
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                      ]}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Birthday defaultValue="2023-01-01" />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <DataRadio
                      name="gender"
                      label="Gender"
                      data={[
                        {
                          label: "Male",
                          value: "male",
                        },
                        {
                          label: "Female",
                          value: "female",
                        },
                        {
                          label: "Complicated",
                          value: "complicated",
                        },
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <DataRadio
                      name="status"
                      label="Marital Status"
                      data={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <DataSelect
                      label="Ready to move"
                      name="status"
                      required={true}
                      defaultValue="yes"
                      data={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Source"
                      name="user_name"
                      required={true}
                      defaultValue={"Source ne"}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="Created by"
                      name="user_name"
                      required={true}
                      defaultValue={"Quynh Thi"}
                      disabled
                    />
                  </Col>
                  <Col span={12}>
                    <DataDatePicker
                      name="createAt"
                      label="Created on"
                      disabled
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="Email"
                      name="user_name"
                      required={true}
                      defaultValue={"thanhbinh@lubrytics.com"}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Address"
                      name="user_name"
                      required={true}
                      defaultValue={"ex: 2 Hai Trieu, Bitexco Financial Tower"}
                    />
                  </Col>
                </Row>

                <Row>
                  <MultiSelect
                    label="Position Applied"
                    name="position"
                    required={false}
                    value={value}
                    setValue={setValue}
                    options={options}
                  />
                </Row>

                <Form.Item className="flex justify-end space-x-2">
                  <Button className="mr-2">Cancel</Button>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div id="part-3" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Skills And Industry</p>
              <Table />
            </div>
            <div id="part-4" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Attachments</p>
              <div className="flex space-x-2">
                <Image
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  size={100}
                />
                <DataUpload label="" />
              </div>
            </div>
          </div>
          <div className="w-1/3 ml-4">
            <div className="bg-white flex-col p-4 rounded-lg">
              <p className="mb-4 font-bold text-lg">Interview Loop</p>
              <Collapse accordion items={items} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
