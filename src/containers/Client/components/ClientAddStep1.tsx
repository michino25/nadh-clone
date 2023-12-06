import { Col, Row, Button, Form, notification } from "antd";

import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import { clientType, cpa, primaryStatus2 } from "_constants/index";
import FormIndustry from "./FormIndustry";
import { clientApi, userApi } from "apis/index";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function CandidateAddStep1({
  nextStep,
  setData,
}: {
  nextStep: () => void;
  setData: (value: any) => void;
}) {
  const [industry, setIndustry] = useState<any[]>([]);

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

  const createClient = async (userData: any) => {
    try {
      const data = await clientApi.createClient(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Client",
        description: "Create success.",
      });

      setData(data);

      setTimeout(() => {
        nextStep();
      }, 1000);
    } catch (error: any) {
      // error
      // console.error("Create failed", error);
      notification.error({
        message: "Create Client",
        description: `Create failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createClient(formData),
  });

  const onFinish = (values: any) => {
    const {
      name,
      code,
      phone,
      fax,
      lead_consultants,
      tax_code,
      email,
      address,
      parent_company,
      status,
      cpa,
      type,
    } = values;

    const transformedData = {
      name,
      code,
      tax_code,
      email,
      parent_id: parent_company,
      status,
      cpa,
      type,
      address: { address },
      phone: { number: phone, phone_code: { key: "1280" } },
      fax: { number: fax, phone_code: { key: "1280" } },
      business_line:
        industry.length > 0 &&
        industry.map((item: any) => ({
          industry: { key: item.industry.key, label: item.industry.label },
          sector: { key: item.sector.key, label: item.sector.label },
        })),
      business_line_send: industry.map((item: any) => ({
        industry_id: item.industry.key,
        sector_id: item.sector.key,
      })),
      lead_consultants: [lead_consultants],
    };

    createMutation.mutate(transformedData);
    console.log("Received values of form: ", transformedData);
    // setData(data);
    // nextStep();
  };

  return (
    <Form layout="vertical" className="w-full" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="Trade Name"
            placeholder="Trade Name"
            name="name"
            required
            defaultValue={""}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Client's Shortened Name"
            placeholder="Client's Shortened Name"
            name="code"
            defaultValue={""}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            label="Phone Number"
            placeholder="Phone Number"
            name="phone"
            required
            defaultValue={""}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Fax"
            placeholder="Fax"
            name="fax"
            required={false}
            defaultValue={""}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Lead consultant"
            name="lead_consultants"
            required
            data={userData}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Tax code"
            placeholder="Tax code"
            name="tax_code"
            required
            defaultValue={""}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input label="Email" placeholder="Email" name="email" />
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
          <FormIndustry value={industry} setValue={setIndustry} />
        </Col>
      </Row>

      <Form.Item className="flex justify-end space-x-2 mt-5">
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
}
