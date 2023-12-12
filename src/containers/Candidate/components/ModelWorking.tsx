import { months, years } from "_constants/index";
import { Button, Form, Row, Col } from "antd";
import { DataSelect } from "components/DataEntry";
import CheckboxData from "components/DataEntry/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";

export default function ModelWorking({
  closeModal,
  edit = false,
}: {
  closeModal: () => void;
  edit?: boolean;
}) {
  const { data: companyData } = useQuery({
    queryKey: ["company"],
    queryFn: () =>
      otherApi.getProperty("company").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key,
        }))
      ),
  });

  const { data: positionData } = useQuery({
    queryKey: ["position"],
    queryFn: () =>
      otherApi.getProperty("position").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key,
        }))
      ),
  });

  return (
    <Form layout="vertical" className="w-full" onFinish={() => {}}>
      <Row gutter={16}>
        <Col span={12}>
          <CheckboxData
            name="current_school"
            placeholder="Current job"
            defaultValue={true}
          />
        </Col>
      </Row>

      <Row gutter={16} align={"bottom"}>
        <Col span={12}>
          <DataSelect
            data={months}
            placeholder="Choose month"
            label="Start year"
            name="Start_year"
          />
        </Col>
        <Col span={12}>
          <DataSelect
            data={years}
            placeholder="Choose year"
            label=""
            name="Start_year"
          />
        </Col>
      </Row>

      <Row gutter={16} align={"bottom"}>
        <Col span={12}>
          <DataSelect
            data={months}
            placeholder="Choose month"
            label="End year"
            name="Start_year"
          />
        </Col>
        <Col span={12}>
          <DataSelect
            data={years}
            placeholder="Choose year"
            label=""
            name="Start_year"
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
