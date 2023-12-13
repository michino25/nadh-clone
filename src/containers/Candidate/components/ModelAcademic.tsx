import { years } from "_constants/index";
import { Button, Form, Row, Col } from "antd";
import { DataSelect } from "components/DataEntry";
import CheckboxData from "components/DataEntry/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";

export default function ModelAcademic({
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
  console.log(data);
  console.log(id);

  const defaultData = data?.filter((item: any) => item.id === id)[0];
  console.log(defaultData);

  const { data: schoolData } = useQuery({
    queryKey: ["school"],
    queryFn: () =>
      otherApi.getProperty("school").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key + "_" + item.label,
        }))
      ),
  });

  const { data: majorData } = useQuery({
    queryKey: ["major"],
    queryFn: () =>
      otherApi.getProperty("major").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key + "_" + item.label,
        }))
      ),
  });

  const { data: degreeData } = useQuery({
    queryKey: ["degree"],
    queryFn: () =>
      otherApi.getProperty("degree").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key + "_" + item.label,
        }))
      ),
  });

  const onFinish = (values: any) => {
    const outputData = {
      start_time: values.Start_year + "-01-01",
      end_time: values.Graduation_year + "-01-01",
      organization: {
        key: values.school.split("_")[0],
        label: values.school.split("_")[1],
      },
      title: {
        key: values.major.split("_")[0],
        label: values.major.split("_")[1],
      },
      degree: {
        key: values.degree.split("_")[0],
        label: values.degree.split("_")[1],
      },

      achievement: null,
      // candidate_id: "e413a13e-469c-4b2a-a3a1-9e7e6dcc8e90",
      type: 1,
      status: values.current_school ? 1 : -1,
    };

    edit ? execute(outputData, defaultData.id) : execute(outputData);
    // console.log("Received values of form: ", outputData);
  };

  console.log(schoolData);

  return (
    <Form layout="vertical" className="w-full" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <CheckboxData
            name="current_school"
            placeholder="Current school"
            defaultValue={defaultData?.status === "Is current school"}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            data={years}
            placeholder="Choose year"
            label="Start year"
            name="Start_year"
            defaultValue={defaultData?.start_time}
          />
        </Col>
        <Col span={12}>
          <DataSelect
            data={years}
            placeholder="Choose year"
            label="Graduation year"
            name="Graduation_year"
            defaultValue={defaultData?.end_time}
          />
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
              defaultData &&
              defaultData.school.key + "_" + defaultData.school.label
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <DataSelect
            data={majorData}
            placeholder="Choose major"
            label="Major"
            name="major"
            defaultValue={
              defaultData &&
              defaultData.major.key + "_" + defaultData.major.label
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
              defaultData &&
              defaultData.degree.key + "_" + defaultData.degree.label
            }
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
