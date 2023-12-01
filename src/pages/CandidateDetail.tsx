import { useParams, Link } from "react-router-dom";
import { Anchor, Col, Row, Button, Form, Skeleton, notification } from "antd";
import { useState } from "react";

import Table from "components/DataDisplay/Table";
import Image from "components/DataDisplay/Image";

import DataUpload from "components/DataEntry/Upload";
import TextArea from "components/DataEntry/TextArea";
import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import Birthday from "components/DataEntry/Birthday";
import DataRadio from "components/DataEntry/Radio";
import DataDatePicker from "components/DataEntry/DatePicker";
import MultiSelect from "components/DataEntry/MultiSelect";
import BackToTopButton from "components/BackToTopButton";
import DynamicFormEmail from "components/DataEntry/DynamicFormEmail";
import DynamicFormPhone from "components/DataEntry/DynamicFormPhone";
import DynamicFormAddress from "components/DataEntry/DynamicFormAddress";

import axios, { axiosWithBaseURL } from "utils/axiosConfig";

import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { formatName } from "utils/format";
import InterviewLoop from "components/InterviewLoop";
import DataInputNumber from "components/DataEntry/InputNumber";

import { createSelectData, gender, primaryStatus } from "_constants/index";

export default function Candidates() {
  const { id } = useParams();

  const [value, setValue] = useState<string[]>([]);

  const { data: dataDegree } = useQuery({
    queryKey: ["degree"],
    queryFn: () =>
      axios
        .get("api/property_values", {
          params: {
            property_name: "degree",
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
        .get("api/property_values", {
          params: {
            property_name: "position",
          },
        })
        .then((res) => {
          return res.data.data.map((item: any) => ({
            label: item.label,
            value: item.key + "_" + item.label,
          }));
        }),
  });

  const { data: candidateData, isPending } = useQuery({
    queryKey: ["candidate", id],
    queryFn: () =>
      axios.get("api/candidates/" + id).then((res) => {
        console.log(res.data);

        return res.data;
      }),
  });

  const { data: candidateImage } = useQuery({
    queryKey: ["files", candidateData?.id],
    queryFn: () =>
      axiosWithBaseURL("https://lubrytics.com:8443/nadh-mediafile")
        .get("files", {
          params: {
            obj_id: "238c5f1e-87da-4358-8aad-acd029320dbf",
            obj_table: "candidates",
            page: 1,
            perPage: 10,
          },
        })
        .then((res) => {
          console.log(res.data.data);

          return res.data.data;
        }),
    enabled: !!candidateData?.id,
  });

  const updateCandidate = async (userData: any) => {
    try {
      await axiosWithBaseURL("https://lubrytics.com:8443/nadh-api-crm").put(
        "api/candidates/" + candidateData.id,
        userData
      );

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
        country: item.country,
        // && typeof item.country === "string"
        //   ? {
        //       key: item.country.split("_")[0],
        //       label: item.country.split("_")[1],
        //     }
        //   : { key: null, label: null },
        //   city: item.city &&
        //     typeof item.city === "string" && {
        //       key: item.city.split("_")[0],
        //       label: item.city.split("_")[1],
        //     },
        //   district: item.district &&
        //     typeof item.district === "string" && {
        //       key: item.district.split("_")[0],
        //       label: item.district.split("_")[1],
        //     },
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

  console.log(candidateData?.business_line);

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

              <Form layout="vertical" className="w-full" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Input
                      label="First Name"
                      name="first_name"
                      required={true}
                      defaultValue={formatName(candidateData.first_name)}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Last Name"
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
                      name="middle_name"
                      required={true}
                      defaultValue={formatName(candidateData.middle_name)}
                    />
                  </Col>
                  <Col span={12}>
                    <DataSelect
                      label="Primary status"
                      name="priority_status"
                      required={true}
                      defaultValue={candidateData.priority_status.toString()}
                      data={primaryStatus}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
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
              <Table data={candidateData?.business_line} />
            </div>
            <div id="part-4" className="p-4 bg-white rounded-lg">
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
          <div className="w-1/3 pl-5 fixed top-50 right-5">
            <div className="bg-white flex-col p-4 rounded-lg overflow-y-scroll max-h-[700px]">
              <p className="mb-4 font-bold text-lg">Interview Loop</p>
              <InterviewLoop data={candidateData?.flows} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
