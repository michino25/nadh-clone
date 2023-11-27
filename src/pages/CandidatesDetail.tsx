import { useParams, Link } from "react-router-dom";
import {
  Anchor,
  Col,
  Row,
  Button,
  Form,
  DatePicker,
  Select,
  Upload,
  Radio,
} from "antd";
import { Timeline } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import type { SelectProps } from "antd";

import Table from "../components/DataDisplay/Table";
import Image from "../components/DataDisplay/Image";

interface ItemProps {
  label: string;
  value: string;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const options: ItemProps[] = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}
const { TextArea } = Input;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

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
  const topRef = React.useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const [value, setValue] = useState(["a10", "c12", "h17", "j19", "k20"]);

  const selectProps: SelectProps = {
    mode: "multiple",
    style: { width: "100%" },
    value,
    options,
    onChange: (newValue: string[]) => {
      setValue(newValue);
    },
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };

  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);

  return (
    <>
      <div className="fixed z-50 bg-gray-100 top-24 left-0 right-0 px-8 py-2">
        <Anchor
          className=""
          direction="horizontal"
          targetOffset={targetOffset}
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
            / CDD-000777 - THANH NAM PHAN33 - ACTIVE - REJECTED BY NADH
          </span>
        </div>
      </div>
      <div className="flex w-full p-5">Detail {id}</div>;
      <div className="px-8">
        <div className="flex">
          <div className="flex-col w-2/3 space-y-4">
            <div id="part-1" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Overview</p>
              <TextArea rows={4} placeholder="54524" />
            </div>
            <div id="part-2" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Personal Information</p>

              <Form layout="vertical" className="w-full">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="full_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your fullname!",
                        },
                      ]}
                    >
                      <Input className="" defaultValue={"thanh binh"} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="user_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input className="" defaultValue={"thanhbinh"} disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Middle Name"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input className="" defaultValue={"thanhbinh"} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Primary status"
                      name="role"
                      rules={[
                        {
                          required: true,
                          message: "Please input your fullname!",
                        },
                      ]}
                    >
                      <Select defaultValue="demo">
                        <Select.Option value="demo">Manager</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Birthday">
                      <Row gutter={16}>
                        <Col span={8}>
                          <Select
                            defaultValue="lucy"
                            allowClear
                            options={[{ value: "lucy", label: "Lucy" }]}
                          />
                        </Col>
                        <Col span={8}>
                          <Select
                            defaultValue="lucy"
                            allowClear
                            options={[{ value: "lucy", label: "Lucy" }]}
                          />
                        </Col>
                        <Col span={8}>
                          <Select
                            defaultValue="lucy"
                            allowClear
                            options={[{ value: "lucy", label: "Lucy" }]}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Gender">
                      <Radio.Group>
                        <Radio value="apple"> Male </Radio>
                        <Radio value="pear"> Female </Radio>
                        <Radio value="pear"> Complicated </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Marital Status">
                      <Radio.Group>
                        <Radio value="apple"> Yes </Radio>
                        <Radio value="pear"> No </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Ready to move"
                      name="role"
                      rules={[
                        {
                          required: true,
                          message: "Please input your fullname!",
                        },
                      ]}
                    >
                      <Select defaultValue="demo">
                        <Select.Option value="demo">Manager</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Source"
                      name="user_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input className="" defaultValue={"Source ne"} disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Created by"
                      name="user_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input className="" defaultValue={"Quynh Thi"} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Created on">
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="full_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your fullname!",
                        },
                      ]}
                    >
                      <Input
                        className=""
                        defaultValue={"thanhbinh@lubrytics.com"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input
                        className=""
                        defaultValue={
                          "ex: 2 Hai Trieu, Bitexco Financial Tower"
                        }
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Select {...selectProps} />
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
              <Image />
              <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
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
