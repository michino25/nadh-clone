import { Col, Row } from "antd";

import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import Birthday from "components/DataEntry/Birthday";
import DataRadio from "components/DataEntry/Radio";
import MultiSelect from "components/DataEntry/MultiSelect";
import DynamicFormEmail from "components/DataEntry/DynamicFormEmail";
import DynamicFormPhone from "components/DataEntry/DynamicFormPhone";
import DynamicFormAddress from "components/DataEntry/DynamicFormAddress";
import DataInputNumber from "components/DataEntry/InputNumber";
import { createSelectData, gender, primaryStatus } from "_constants/index";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatName } from "utils/format";
import { DataDatePicker } from "components/DataEntry";

export default function PersonalInformationForm({
  candidateData,
  setAddress,
  address,
}: {
  candidateData?: any;
  setAddress: (data: any) => void;
  address: any;
}) {
  const [nationality, setNationality] = useState<string[]>([]);
  const [position, setPosition] = useState<string[]>([]);

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

  const { data: dataNationality } = useQuery({
    queryKey: ["nationality"],
    queryFn: async () =>
      await otherApi.getProperty("nationality").then((res) => {
        return res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key + "_" + item.label,
        }));
      }),
  });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="First Name"
            placeholder="First Name"
            name="first_name"
            required={true}
            defaultValue={formatName(candidateData?.first_name)}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Last Name"
            placeholder="Last Name"
            name="last_name"
            required={true}
            defaultValue={formatName(candidateData?.last_name)}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="Middle Name"
            placeholder="Middle Name"
            name="middle_name"
            defaultValue={formatName(candidateData?.middle_name)}
          />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Primary status"
            placeholder="Primary status"
            name="priority_status"
            required={true}
            defaultValue={candidateData?.priority_status.toString()}
            data={primaryStatus}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Birthday defaultValue={candidateData?.dob || ""} />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Highest Education"
            placeholder="Highest Education"
            name="highest_education"
            defaultValue={
              candidateData?.highest_education?.key &&
              candidateData?.highest_education.key +
                "_" +
                candidateData?.highest_education.label
            }
            data={dataDegree ? dataDegree : []}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataRadio
            name="gender"
            label="Gender"
            defaultValue={candidateData?.gender.toString()}
            data={createSelectData(gender)}
          />
        </Col>
        <Col span={12}>
          <DataRadio
            name="martial_status"
            label="Marital Status"
            defaultValue={candidateData?.extra.martial_status}
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
            defaultValue={
              candidateData?.relocating_willingness.toString() || "1"
            }
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
            defaultValue={candidateData?.source}
          />
        </Col>
      </Row>

      {candidateData && (
        <Row gutter={16}>
          <Col span={12}>
            <Input
              label="Created by"
              placeholder="Created by"
              name="user_name"
              required={true}
              defaultValue={formatName(candidateData?.creator.full_name)}
              disabled
            />
          </Col>
          <Col span={12}>
            <DataDatePicker
              name="createdAt"
              defaultValue={candidateData?.createdAt}
              label="Created on"
              disabled
            />
          </Col>
        </Row>
      )}

      <Row gutter={16}>
        <Col span={12}>
          <DynamicFormEmail
            defaultValue={candidateData?.emails}
            name="emails"
            required={true}
          />
        </Col>
        <Col span={12}>
          <DynamicFormPhone
            defaultValue={candidateData?.phones}
            name="phones"
            required={true}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <DynamicFormAddress
            defaultValue={candidateData?.addresses}
            setAddress={setAddress}
            address={address}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <MultiSelect
            label="Position Applied"
            name="prefer_position"
            required={false}
            defaultValue={candidateData?.prefer_position.positions.map(
              (item: any) => item.key + "_" + item.label
            )}
            value={position}
            setValue={setPosition}
            options={dataPosition ? dataPosition : []}
          />
        </Col>
        <Col span={12}>
          <MultiSelect
            label="Nationality"
            name="nationality"
            required={false}
            defaultValue={candidateData?.nationality.map(
              (item: any) => item.key + "_" + item.label
            )}
            value={nationality}
            setValue={setNationality}
            options={dataNationality ? dataNationality : []}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataInputNumber
            label="Industry Year of Services"
            defaultValue={candidateData?.industry_years}
            placeholder={"0"}
            name="industry_years"
          />
        </Col>
        <Col span={12}>
          <DataInputNumber
            label="Year of Management"
            defaultValue={candidateData?.management_years}
            placeholder={"0"}
            name="management_years"
          />
        </Col>
      </Row>
    </>
  );
}
