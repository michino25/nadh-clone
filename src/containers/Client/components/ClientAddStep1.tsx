import { Col, Row, Button, Form, notification, Input as InputAntd } from "antd";

import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import {
  clientType,
  convertValuetoKey,
  cpa,
  primaryStatus2,
} from "_constants/index";
import { clientApi, otherApi, userApi } from "apis/index";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Address from "components/DataEntry/Address";
import Phone from "components/DataEntry/Phone";
import { AxiosError } from "axios";
import IndustryState from "components/ShareComponents/IndustryState";
import { iClient, iCountry, iIndustry } from "utils/models";

export default function CandidateAddStep1({
  nextStep,
  setData,
}: {
  nextStep: () => void;
  setData: (value: iClient) => void;
}) {
  const [industry, setIndustry] = useState<iIndustry[]>([]);
  const [address, setAddress] = useState<any>();
  const [taxCheckContent, setTaxCheckContent] = useState("");

  const { data: userData } = useQuery({
    queryKey: ["all_users"],
    queryFn: async () => userApi.getUsers({}),
    select: (res) =>
      res.data.data.map((item: { id: string; full_name: string }) => ({
        value: item.id,
        label: formatName(item.full_name),
      })),
  });

  const { data: clientData } = useQuery({
    queryKey: ["all_clients"],
    queryFn: async () => clientApi.getClients({}),
    select: (res) =>
      res.data.data.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: formatName(item.name),
      })),
  });

  const { data: countries } = useQuery({
    queryKey: ["all_countries"],
    queryFn: async () => await otherApi.getCountries(),
    select: (res) => res.data.data,
  });

  const { data: taxCheck } = useQuery({
    queryKey: ["conflict_tax", taxCheckContent],
    queryFn: async () => {
      try {
        await otherApi.getConflictTax(taxCheckContent);
        return false;
      } catch (error) {
        return true;
      }
    },
    enabled: taxCheckContent !== "",
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

      setData(data.data);

      setTimeout(() => {
        nextStep();
      }, 1000);
    } catch (error: unknown) {
      // error
      // console.error("Create failed", error);
      if (error instanceof AxiosError)
        notification.error({
          message: "Create Client",
          description: `Create failed. ${
            error.response?.data[0].message || "Please try again."
          }`,
        });
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createClient(formData),
  });

  const phoneData = (
    input: { phone_code: iCountry; number: string },
    countryData: iCountry[]
  ) => {
    const countryCode = input.phone_code.extra.dial_code;

    const countryInfo = countryData.find(
      (country: iCountry) => country.extra.dial_code === countryCode
    );

    if (countryInfo) {
      const data = {
        number: parseInt(input.number),
        phone_code: {
          key: countryInfo.key.toString(),
        },
      };
      return data;
    }
  };

  const onFinish = (values: any) => {
    const {
      name,
      code,
      phone,
      fax,
      lead_consultants,
      tax_code,
      email,
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
      status: parseInt(status),
      cpa: parseInt(cpa),
      type: parseInt(type),
      lead_consultants: [lead_consultants],
      address: {
        ...(address.address && { address: address.address }),
        ...(address.country && { country: convertValuetoKey(address.country) }),
        ...(address.city && { city: convertValuetoKey(address.city) }),
        ...(address.district && {
          district: convertValuetoKey(address.district),
        }),
      },
      business_line: industry.map((item) => ({
        ...(item.industry && { industry_id: item.industry.value }),
        ...(item.sector && { sector_id: item.sector.value }),
        ...(item.category && { category_id: item.category.value }),
      })),

      phone: phoneData(phone, countries),
      fax: phoneData(fax, countries),
    };

    console.log("Received values of form: ", transformedData);
    createMutation.mutate(transformedData);
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
          <Phone name="phone" label="Phone Number" required />
        </Col>
        <Col span={12}>
          <Phone name="fax" label="Fax" />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Lead consultant"
            placeholder="Lead consultant"
            name="lead_consultants"
            required
            data={userData}
          />
        </Col>
        <Col span={12}>
          <Form.Item
            label="Tax code"
            name="tax_code"
            validateDebounce={100}
            rules={[
              {
                required: true,
                message: `Please input your Tax code!`,
              },
              () => ({
                validator() {
                  if (taxCheck === true) {
                    return Promise.reject(new Error("Duplicated!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputAntd
              placeholder="Tax code"
              onChange={(data) => setTaxCheckContent(data.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input label="Email" placeholder="Email" name="email" type="email" />
        </Col>
        <Col span={12}>
          <Form.Item label="Address" name="address">
            <Address onChange={(data) => setAddress(data)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Parent Company"
            placeholder="Parent Company"
            name="parent_company"
            data={clientData}
          />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Status"
            placeholder="Status"
            name="status"
            data={primaryStatus2}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect label="CPA" placeholder="CPA" name="cpa" data={cpa} />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Type"
            placeholder="Type"
            name="type"
            data={clientType}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <IndustryState industry={industry} setIndustry={setIndustry} />
        </Col>
      </Row>

      <Form.Item className="flex justify-end space-x-2 mt-5">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
