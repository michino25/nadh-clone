import { Col, Row, Button, Form } from "antd";

import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import { clientType, cpa, primaryStatus2 } from "_constants/index";
import FormIndustry from "./FormIndustry";
import { clientApi, userApi } from "apis/index";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function CandidateAddStep1({
  nextStep,
}: {
  nextStep: () => void;
}) {
  const [value, setValue] = useState<any[]>([]);

  const { data: userData } = useQuery({
    queryKey: ["User"],
    queryFn: async () =>
      await userApi.getUsers({}).then((res: any) =>
        res.data.data.map((user: any) => ({
          label: formatName(user.full_name),
          value: user.id,
        }))
      ),
  });

  const { data: clientData } = useQuery({
    queryKey: ["Client"],
    queryFn: async () =>
      await clientApi.getClients({}).then((res: any) =>
        res.data.data.map((clients: any) => ({
          label: formatName(clients.name),
          value: clients.id,
        }))
      ),
  });

  const onFinish = (values: any) => {
    const data = {
      ...values,
      value,
    };
    // createMutation.mutate(data);
    console.log("Received values of form: ", data);
    nextStep();
  };

  return (
    <Form layout="vertical" className="w-full" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="Trade Name"
            name="name"
            required={true}
            defaultValue={""}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Client's Shortened Name"
            name="code"
            required={false}
            defaultValue={""}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="Phone Number"
            name="phone.number"
            required={true}
            defaultValue={""}
          />
        </Col>
        <Col span={12}>
          <Input label="Fax" name="fax" required={false} defaultValue={""} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Lead consultant"
            name="lead_consultants"
            required={true}
            data={userData}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Tax code"
            name="tax_code"
            required={true}
            defaultValue={""}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="Email"
            name="email"
            defaultValue={"thanhbinh@lubrytics.com"}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Address"
            name="address"
            placeholder={"ex: 2 Hai Trieu, Bitexco Financial Tower"}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Parent Company"
            name="parent_company"
            required={true}
            data={clientData}
          />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Status"
            name="status"
            required={true}
            data={primaryStatus2}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect label="CPA" name="cpa" data={cpa} />
        </Col>
        <Col span={12}>
          <DataSelect label="Type" name="type" data={clientType} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <FormIndustry value={value} setValue={setValue} />
        </Col>
      </Row>

      <Form.Item className="flex justify-end space-x-2 mt-5">
        <Button className="mr-2">Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
