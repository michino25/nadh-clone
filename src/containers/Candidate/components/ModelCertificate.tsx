import { filterOption, iOption2, years } from "_constants/index";
import { Button, Form, Row, Col, Select } from "antd";
import { DataSelect } from "components/DataEntry";
import CheckboxData from "components/DataEntry/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";
import { useEffect, useState } from "react";
import CkeditorInput from "components/DataEntry/CkeditorInput";

export default function ModelCertificate({
  closeModal,
  edit = false,
  execute,
  onDelete,
  data,
  id,
}: {
  closeModal: () => void;
  edit?: boolean;
  execute: (data: any, id?: string) => void;
  data?: any;
  onDelete?: (id: any) => void;
  id?: string;
}) {
  const defaultData = data?.filter((item: any) => item.id === id)[0];
  console.log(defaultData);

  const [achievement, setAchievement] = useState("");
  useEffect(() => {
    if (defaultData) setAchievement(defaultData?.achievement);
  }, [defaultData]);

  const [checkbox, setCheckbox] = useState(
    defaultData?.status === "Is current school"
  );

  const { data: schoolData } = useQuery({
    queryKey: ["school"],
    queryFn: () => otherApi.getProperty("school"),
    select: (res) =>
      res.data.data.map((item: iOption2) => ({
        label: item.label,
        value: item.key + "_" + item.label,
      })),
  });

  const { data: degreeData } = useQuery({
    queryKey: ["degree"],
    queryFn: () => otherApi.getProperty("certificate"),
    select: (res) =>
      res.data.data.map((item: iOption2) => ({
        label: item.label,
        value: item.key + "_" + item.label,
      })),
  });

  const onFinish = (values: any) => {
    const outputData = {
      start_time: values.Start_year + "-01-01",
      ...(!checkbox ? { end_time: values.Graduation_year + "-01-01" } : {}),

      organization: values.school && {
        key: values.school.split("_")[0],
        label: values.school.split("_")[1],
      },
      title: values.degree && {
        key: values.degree.split("_")[0],
        label: values.degree.split("_")[1],
      },
      achievement: achievement,
      type: 3,
      status: values.current_school ? 1 : -1,
    };

    edit ? execute(outputData, defaultData.id) : execute(outputData);
    console.log("Received values of form: ", outputData);
  };

  console.log(schoolData);

  return (
    <Form
      layout="vertical"
      preserve={false}
      className="w-full"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <CheckboxData
            name="current_school"
            placeholder="Current school"
            checked={checkbox}
            onChange={setCheckbox}
            defaultValue={checkbox}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Start_year"
            label="Start year"
            initialValue={defaultData?.start_time}
            dependencies={["Graduation_year"]}
            rules={[
              {
                required: true,
                message: `Please input your your start year!`,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && getFieldValue("Graduation_year")) {
                    if (value > getFieldValue("Graduation_year"))
                      return Promise.reject(
                        new Error(
                          "The starting year must be before the graduation year!"
                        )
                      );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder="Choose year"
              showSearch
              filterOption={filterOption}
              allowClear
              options={years}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Graduation year"
            name="Graduation_year"
            initialValue={defaultData?.end_time}
            dependencies={["Start_year"]}
            rules={[
              {
                required: !checkbox,
                message: `Please input your your graduation year!`,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && getFieldValue("Start_year")) {
                    if (value < getFieldValue("Start_year"))
                      return Promise.reject(
                        new Error(
                          "The starting year must be before the graduation year!"
                        )
                      );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder="Choose year"
              showSearch
              disabled={checkbox}
              filterOption={filterOption}
              allowClear
              options={years}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <DataSelect
            data={schoolData}
            placeholder="Choose school"
            label="School"
            name="school"
            defaultValue={
              defaultData?.school &&
              defaultData.school.key + "_" + defaultData.school.label
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <DataSelect
            data={degreeData}
            placeholder="Choose degree"
            label="Degree"
            name="degree"
            required
            defaultValue={
              defaultData?.degree &&
              defaultData.degree.key + "_" + defaultData.degree.label
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorInput
            value={achievement}
            setValue={setAchievement}
            label="Achievement"
            defaultValue={defaultData?.achievement}
          />
        </Col>
      </Row>

      <Row gutter={16} justify={edit ? "space-between" : "end"}>
        {edit && (
          <Col>
            <Button
              type="primary"
              danger
              onClick={() => onDelete && onDelete(defaultData?.id)}
            >
              Delete
            </Button>
          </Col>
        )}
        <Col>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="primary" htmlType="submit" className="ml-3">
            {edit ? "Save" : "Add"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
