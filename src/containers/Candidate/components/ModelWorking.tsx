import { iOption2, months, years } from "_constants/index";
import { Button, Form, Row, Col } from "antd";
import { DataSelect } from "components/DataEntry";
import CheckboxData from "components/DataEntry/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";
import { useEffect, useState } from "react";
import CkeditorInput from "components/DataEntry/CkeditorInput";

export default function ModelWorking({
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
  onDelete?: (id: string) => void;
  id?: string;
}) {
  const defaultData = data?.filter((item: any) => item.id === id)[0];
  console.log(defaultData);
  const [checkbox, setCheckbox] = useState(defaultData?.status === 1);

  const [responsibility, setResponsibility] = useState("");
  const [achievement, setAchievement] = useState("");
  const [references, setReferences] = useState("");
  const [pushPullFactor, setPushPullFactor] = useState("");
  useEffect(() => {
    if (defaultData) {
      setResponsibility(defaultData?.responsibility);
      setAchievement(defaultData?.achievement);
      setReferences(defaultData?.references);
      setPushPullFactor(defaultData?.push_pull_factor);
    }
  }, [defaultData]);

  const { data: companyData } = useQuery({
    queryKey: ["company"],
    queryFn: () => otherApi.getProperty("company"),
    select: (res) =>
      res.data.data.map((item: iOption2) => ({
        label: item.label,
        value: item.key + "_" + item.label,
      })),
  });

  const { data: positionData } = useQuery({
    queryKey: ["position"],
    queryFn: () => otherApi.getProperty("position"),
    select: (res) =>
      res.data.data.map((item: iOption2) => ({
        label: item.label,
        value: item.key + "_" + item.label,
      })),
  });

  const onFinish = (values: any) => {
    const outputData = {
      start_time: values.Start_year + "-" + values.Start_month + "-01",
      ...(!checkbox
        ? { end_time: values.End_year + "-" + values.End_month + "-01" }
        : {}),

      organization: values?.company && {
        key: values.company.split("_")[0],
        label: values.company.split("_")[1],
      },
      title: values?.position && {
        key: values.position.split("_")[0],
        label: values.position.split("_")[1],
      },
      type: 2,
      status: values.current_job ? 1 : -1,

      push_pull_factor: pushPullFactor,
      references,
      responsibility,
      achievement,
    };
    edit ? execute(outputData, defaultData.id) : execute(outputData);
    console.log("Received values of form: ", outputData);
  };

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
            name="current_job"
            placeholder="Current job"
            checked={checkbox}
            onChange={setCheckbox}
            defaultValue={checkbox}
          />
        </Col>
      </Row>

      <Row gutter={16} align={"bottom"}>
        <Col span={6}>
          <DataSelect
            data={months}
            placeholder="Start month"
            label="Start year"
            name="Start_month"
            required
            defaultValue={defaultData?.start_time?.split("-")[1]}
          />
        </Col>
        <Col span={6}>
          <DataSelect
            data={years}
            placeholder="Start year"
            label=""
            required
            name="Start_year"
            defaultValue={defaultData?.start_time?.split("-")[0]}
          />
        </Col>
        <Col span={6}>
          <DataSelect
            data={months}
            placeholder="End month"
            label="End year"
            name="End_month"
            required={!checkbox}
            disable={checkbox}
            defaultValue={
              defaultData?.end_time !== "Present"
                ? defaultData?.end_time?.split("-")[1]
                : undefined
            }
          />
        </Col>
        <Col span={6}>
          <DataSelect
            data={years}
            placeholder="End year"
            label=""
            name="End_year"
            required={!checkbox}
            disable={checkbox}
            defaultValue={
              defaultData?.end_time !== "Present"
                ? defaultData?.end_time?.split("-")[0]
                : undefined
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <DataSelect
            data={companyData}
            placeholder="Choose company"
            label="Company"
            name="company"
            required
            defaultValue={
              defaultData &&
              defaultData.company.key + "_" + defaultData.company.label
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <DataSelect
            data={positionData}
            placeholder="Choose position"
            label="Position"
            name="position"
            required
            defaultValue={
              defaultData &&
              defaultData.position.key + "_" + defaultData.position.label
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorInput
            value={responsibility}
            setValue={setResponsibility}
            label="Duties"
            defaultValue={defaultData?.responsibility}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorInput
            value={achievement}
            setValue={setAchievement}
            label="Work Achievement"
            defaultValue={defaultData?.achievement}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorInput
            value={references}
            setValue={setReferences}
            label="References"
            defaultValue={defaultData?.references}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorInput
            value={pushPullFactor}
            setValue={setPushPullFactor}
            label="Pull/Push Factor"
            defaultValue={defaultData?.push_pull_factor}
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
