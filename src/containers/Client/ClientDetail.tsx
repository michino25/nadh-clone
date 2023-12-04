import { useParams, Link } from "react-router-dom";
import {
  Anchor,
  Col,
  Row,
  Button,
  Form,
  Timeline,
  Collapse,
  Descriptions,
  Skeleton,
} from "antd";
import type { CollapseProps } from "antd";
import { useState } from "react";

// import Table from "components/DataDisplay/Table";
import Image from "components/DataDisplay/Image";

import {
  DataUpload,
  Input,
  DataSelect,
  Birthday,
  DataRadio,
  DataDatePicker,
  MultiSelect,
} from "components/DataEntry/index";

import BackToTopButton from "components/BackToTopButton";
import { iOption } from "_constants/index";
import { clientApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";

const options: iOption[] = [];

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
];

export default function Candidates() {
  const { id } = useParams();
  const [value, setValue] = useState<string[]>([]);

  const { data: clientData, isPending } = useQuery({
    queryKey: ["client", id],
    queryFn: async () =>
      await clientApi.getOneClient(id as string).then((res) => {
        return {
          ...res.data,
        };
      }),
  });

  console.log(clientData);

  if (isPending || !id) return <Skeleton active />;

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
              title: "Information",
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "Industry & Contact Person & Account Development",
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "Client Description",
            },
          ]}
        />
        <div className="py-1">
          <Link to={"/candidates"}>Clients List</Link>
          <span>
            {" "}
            / {id} | {clientData.name}
          </span>
        </div>
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex-col space-y-4">
          <div id="part-1" className="p-6 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">{clientData.name}</p>
            <div className="flex">
              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Address">
                  {clientData.address.country.label}
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">
                  {clientData.phone.phone_code.extra.dial_code}{" "}
                  {clientData.phone.number}
                </Descriptions.Item>
                <Descriptions.Item label="Fax">
                  {clientData.fax.phone_code.extra.dial_code}{" "}
                  {clientData.fax.number}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {clientData.email}
                </Descriptions.Item>
                <Descriptions.Item label="Tax Code">
                  {clientData.tax_code}
                </Descriptions.Item>
              </Descriptions>

              <Image
                src={
                  "https://lubrytics.com:8443/nadh-mediafile/file/" +
                  clientData.mediafiles.logo
                }
                size={200}
              />
            </div>
            <div className="my-5 font-medium text-lg">Client Information</div>
            <div className="flex">
              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Client ID">
                  {clientData.client_id}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {clientData.status}
                </Descriptions.Item>
                <Descriptions.Item label="Client's shortened name">
                  {clientData.code}
                </Descriptions.Item>
                <Descriptions.Item label="Parent Company">
                  {clientData.parent_company.label}
                </Descriptions.Item>
                <Descriptions.Item label="Factory Site 1">
                  {clientData.factory_site[0].district.label} -{" "}
                  {clientData.factory_site[0].city.label} -{" "}
                  {clientData.factory_site[0].country.label}
                </Descriptions.Item>
                <Descriptions.Item label="Factory Site 2">-</Descriptions.Item>
              </Descriptions>

              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Client Type">
                  {clientData.type}
                </Descriptions.Item>
                <Descriptions.Item label="CPA">
                  {clientData.cpa}
                </Descriptions.Item>
                <Descriptions.Item label="Lead Consultant">
                  {clientData.lead_consultants[0].label}
                </Descriptions.Item>
                <Descriptions.Item label="Search Consultant">
                  -
                </Descriptions.Item>
                <Descriptions.Item label="Updated By">
                  {clientData.creator.full_name}
                </Descriptions.Item>
                <Descriptions.Item label="Updated On">
                  {clientData.createdAt}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
          <div id="part-2" className="flex">
            <div className="p-6 flex-col w-2/3 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Personal Information</p>

              <Form layout="vertical" className="w-full">
                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="First Name"
                      name="full_name"
                      required={true}
                      defaultValue={"thanh binh"}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Last Name"
                      name="user_name"
                      required={true}
                      defaultValue={"thanhbinh"}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="Middle Name"
                      name="user_name"
                      required={true}
                      defaultValue={"thanhbinh"}
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

            <div className="p-6 w-1/3 ml-4 bg-white rounded-lg flex-col">
              <p className="mb-4 font-bold text-lg">Interview Loop</p>
              <Collapse accordion items={items} />
            </div>
          </div>
          <div id="part-3" className="p-6 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Skills And Industry</p>
            {/* <Table data={} /> */}
          </div>
          <div id="part-4" className="p-6 bg-white rounded-lg">
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
      </div>
    </>
  );
}
