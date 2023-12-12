import { years } from "_constants/index";
import { Button, Form, Row, Col } from "antd";
import { DataSelect } from "components/DataEntry";
import CheckboxData from "components/DataEntry/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";

export default function ModelCertificate({
  closeModal,
  edit = false,
}: {
  closeModal: () => void;
  edit?: boolean;
}) {
  const { data: schoolData } = useQuery({
    queryKey: ["school"],
    queryFn: () =>
      otherApi.getProperty("school").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key,
        }))
      ),
  });

  const { data: degreeData } = useQuery({
    queryKey: ["degree"],
    queryFn: () =>
      otherApi.getProperty("certificate").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key,
        }))
      ),
  });

  console.log(schoolData);

  return (
    <Form layout="vertical" className="w-full" onFinish={() => {}}>
      <Row gutter={16}>
        <Col span={12}>
          <CheckboxData
            name="current_school"
            placeholder="Current school"
            defaultValue={true}
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
          />
        </Col>
        <Col span={12}>
          <DataSelect
            data={years}
            placeholder="Choose year"
            label="Graduation year"
            name="Graduation_year"
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
          />
        </Col>
      </Row>

      <Row gutter={16} justify={edit ? "space-between" : "end"}>
        {edit && (
          <Col>
            <Button type="primary" danger onClick={closeModal}>
              Delete
            </Button>
          </Col>
        )}
        <Col>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="primary" onClick={closeModal} className="ml-3">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
