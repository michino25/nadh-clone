import { useParams, Link } from "react-router-dom";
import { Anchor, Col, Row, Button, Form, Skeleton, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";

import IndustryTable from "components/DataDisplay/IndustryTable";
import Image from "components/DataDisplay/Image";

import {
  DataUpload,
  TextArea,
  Input,
  DataSelect,
  Birthday,
  DataRadio,
  DataDatePicker,
  MultiSelect,
  DynamicFormEmail,
  DynamicFormPhone,
  DynamicFormAddress,
} from "components/DataEntry/index";

import BackToTopButton from "components/BackToTopButton";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { formatName } from "utils/format";
import InterviewLoop from "containers/Candidate/components/InterviewLoop";
import DataInputNumber from "components/DataEntry/InputNumber";

import { createSelectData, gender, primaryStatus } from "_constants/index";
import { candidateApi, otherApi } from "apis/index";
import { getUser } from "utils/getUser";
import FormIndustry from "containers/Client/components/FormIndustry";
import WorkingHistory from "./components/WorkingHistory";
import Academic from "./components/Academic";
import Certificate from "./components/Certificate";

export default function Candidates() {
  const { id } = useParams();

  const [value, setValue] = useState<string[]>([]);
  const [industry, setIndustry] = useState<any[]>([]);

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
      await otherApi.getProperty("position").then((res) => {
        return res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key + "_" + item.label,
        }));
      }),
  });

  const { data: candidateData, isPending } = useQuery({
    queryKey: ["candidate", id],
    queryFn: async () =>
      await candidateApi.getOneCandidate(id as string).then((res) => {
        // console.log(!res.data.addresses[0].city);
        return {
          ...res.data,
          addresses: res.data.addresses.map((addressItem: any) => ({
            address: addressItem.address,
            country: addressItem.country
              ? addressItem.country.key + "_" + addressItem.country.label
              : null,
            city: addressItem.city
              ? addressItem.city.key + "_" + addressItem.city.label
              : null,
            district: addressItem.district
              ? addressItem.district.key + "_" + addressItem.district.label
              : null,
          })),
        };
      }),
  });

  const { data: candidateImage } = useQuery({
    queryKey: ["files", candidateData?.id],
    queryFn: () =>
      otherApi.getFile(candidateData?.id, "candidates").then((res) => {
        console.log(res.data.data);

        return res.data.data;
      }),
    enabled: !!candidateData?.id,
  });

  const updateCandidate = async (userData: any) => {
    try {
      await candidateApi.updateCandidate(candidateData.id, userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Update Candidate",
        description: "Update success.",
      });
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Candidate",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateCandidate(formData),
  });

  const onFinish = (values: any) => {
    const dob =
      values.birthday.year && values.birthday.month && values.birthday.day
        ? `${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`
        : null;

    console.log(values.addresses[0].country);

    const data = {
      ...values,
      addresses: values.addresses.map((item: any) => ({
        address: item.address,
        country:
          item.country && typeof item.country === "string"
            ? {
                key: item.country.split("_")[0],
                label: item.country.split("_")[1],
              }
            : { key: null, label: null },
        city: item.city &&
          typeof item.city === "string" && {
            key: item.city.split("_")[0],
            label: item.city.split("_")[1],
          },
        district: item.district &&
          typeof item.district === "string" && {
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
    updateMutation.mutate(data);
    console.log("Received values of form: ", data);
  };

  const [showBtn, setShowBtn] = useState(false);
  const [showOverviewSave, setShowOverviewSave] = useState(false);

  const onFinishOverview = (values: any) => {
    updateMutation.mutate(values);
    console.log("Received values of form: ", value);
  };

  console.log(candidateData?.business_line);

  if (isPending || !id) return <Skeleton active />;

  return (
    <>
      <BackToTopButton />
      <div className="fixed z-40 bg-gray-100 top-24 left-0 right-0 px-8 pb-2 pt-4">
        <div className="py-1 flex justify-between">
          <div>
            <Link to={"/candidates"}>Candidates List</Link>
            <span>
              {" "}
              / {candidateData.candidate_id} -{" "}
              {candidateData.full_name.toUpperCase()}
            </span>
          </div>
          <div>
            <Button
              href={
                "https://lubrytics.com:8443/nadh-api-crm/api/export/candidates/" +
                id +
                "/CV?download=true&token=" +
                getUser().token
              }
              type="primary"
              icon={<DownloadOutlined />}
            >
              Download File PDF
            </Button>
          </div>
        </div>
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
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex">
          <div className="flex-col w-2/3 space-y-4">
            <div id="part-1" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Overview</p>
              <Form
                layout="vertical"
                className="w-full"
                onFinish={onFinishOverview}
                onValuesChange={() => setShowOverviewSave(true)}
              >
                <TextArea
                  name="overview_text_new"
                  label=""
                  placeholder="Overview"
                  defaultValue={candidateData.overview_text_new}
                />
                {showOverviewSave && (
                  <Form.Item className="flex justify-end space-x-2">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
            <div id="part-2" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Personal Information</p>

              <Form
                layout="vertical"
                className="w-full"
                onFinish={onFinish}
                onValuesChange={() => setShowBtn(true)}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      name="first_name"
                      required={true}
                      defaultValue={formatName(candidateData.first_name)}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      name="last_name"
                      required={true}
                      defaultValue={formatName(candidateData.last_name)}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="Middle Name"
                      placeholder="Middle Name"
                      name="middle_name"
                      defaultValue={formatName(candidateData.middle_name)}
                    />
                  </Col>
                  <Col span={12}>
                    <DataSelect
                      label="Primary status"
                      placeholder="Primary status"
                      name="priority_status"
                      required={true}
                      defaultValue={candidateData.priority_status.toString()}
                      data={primaryStatus}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Birthday defaultValue={candidateData.dob} />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <DataRadio
                      name="gender"
                      label="Gender"
                      defaultValue={candidateData.gender.toString()}
                      data={createSelectData(gender)}
                    />
                  </Col>
                  <Col span={12}>
                    <DataRadio
                      name="martial_status"
                      label="Marital Status"
                      defaultValue={candidateData.extra.martial_status}
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
                      required={true}
                      defaultValue={candidateData.relocating_willingness.toString()}
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
                      defaultValue={candidateData.source}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="Created by"
                      placeholder="Created by"
                      name="user_name"
                      required={true}
                      defaultValue={formatName(candidateData.creator.full_name)}
                      disabled
                    />
                  </Col>
                  <Col span={12}>
                    <DataDatePicker
                      name="createdAt"
                      defaultValue={candidateData.createdAt}
                      label="Created on"
                      disabled
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <DynamicFormEmail
                      defaultValue={candidateData.emails}
                      name="emails"
                      required={true}
                    />
                  </Col>
                  <Col span={12}>
                    <DynamicFormPhone
                      defaultValue={candidateData.phones.map(
                        (item: any) => item.number
                      )}
                      name="phones"
                      required={true}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <DynamicFormAddress
                      defaultValue={candidateData.addresses}
                      name="addresses"
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <MultiSelect
                      label="Position Applied"
                      name="prefer_position"
                      required={false}
                      defaultValue={candidateData.prefer_position.positions.map(
                        (item: any) => item.key + "_" + item.label
                      )}
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
                      defaultValue={
                        candidateData?.highest_education?.key &&
                        candidateData.highest_education.key +
                          "_" +
                          candidateData.highest_education.label
                      }
                      data={dataDegree ? dataDegree : []}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <DataInputNumber
                      label="Industry Year of Services"
                      defaultValue={candidateData.industry_years}
                      placeholder={"0"}
                      name="industry_years"
                    />
                  </Col>
                  <Col span={12}>
                    <DataInputNumber
                      label="Year of Management"
                      defaultValue={candidateData.management_years}
                      placeholder={"0"}
                      name="management_years"
                    />
                  </Col>
                </Row>

                {showBtn && (
                  <Form.Item className="fixed bottom-0 right-0 left-0 bg-gray-200 mb-0 z-40 flex justify-end space-x-2 py-3 px-8">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
            <div id="part-3" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Skills And Industry</p>
              <FormIndustry
                value={industry}
                setValue={setIndustry}
                create={false}
                saveClick={() => console.log(industry)}
              />
              <IndustryTable
                deleteItem={() => {}}
                data={candidateData?.business_line}
              />
            </div>
            <div id="part-4" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Education</p>
              <Academic data={candidateData?.histories} />
              <span className="p-1"></span>
              <Certificate data={candidateData?.histories} />
            </div>
            <div id="part-5" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Working History</p>
              <WorkingHistory data={candidateData?.histories} />
            </div>
            <div id="part-6" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Remuneration And Rewards</p>
              {/* <CkEditor /> */}
            </div>
            <div id="part-7" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Attachments</p>
              <div className="flex space-x-2">
                {candidateImage?.length > 0 &&
                  candidateImage.map((item: any) => (
                    <Image
                      src={
                        "https://lubrytics.com:8443/nadh-mediafile/file/" +
                        item.id
                      }
                      size={100}
                    />
                  ))}
                <DataUpload label="" />
              </div>
            </div>
          </div>
          <div className="w-1/3 pl-5">
            <div className="bg-white flex-col p-4 rounded-lg">
              <p className="mb-4 font-bold text-lg">Interview Loop</p>
              <InterviewLoop data={candidateData?.flows} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
