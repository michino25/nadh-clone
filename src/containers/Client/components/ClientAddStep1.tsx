import { Col, Row, Button, Form, notification, Input as InputAntd } from "antd";

import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import {
  clientType,
  convertValuetoKey,
  cpa,
  primaryStatus2,
} from "_constants/index";
import FormIndustry from "./FormIndustry";
import { clientApi, otherApi, userApi } from "apis/index";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import IndustryTable from "components/DataDisplay/IndustryTable";
import Address from "components/DataEntry/Address";
import Phone from "components/DataEntry/Phone";
import { AxiosError } from "axios";

export default function CandidateAddStep1({
  nextStep,
  setData,
}: {
  nextStep: () => void;
  setData: (value: any) => void;
}) {
  const [industry, setIndustry] = useState<any[]>([]);
  const [address, setAddress] = useState<any>();
  const [taxCheckContent, setTaxCheckContent] = useState("");
  // const taxCheck = useRef(false);

  const deleteItem = (id: string) => {
    if (industry) setIndustry(industry.filter((item: any) => item.id !== id));
  };

  const primaryItem = (id: string) => {
    console.log(id);
    console.log(industry);

    if (industry)
      setIndustry(
        industry.map((item: any) =>
          item.id === id
            ? {
                ...item,
                primary: item.primary ? item.primary * -1 : 1,
              }
            : item
        )
      );
  };

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

  const { data: countries } = useQuery({
    queryKey: ["countries", "phonekey"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) => res.data.data),
  });

  const { data: taxCheck } = useQuery({
    queryKey: ["conflictTax", taxCheckContent],
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

  console.log(taxCheck);

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

  const phoneData = (input: any, countryData: any[]) => {
    const countryCode = input.phone_code.extra.dial_code;

    const countryInfo = countryData.find(
      (country: any) => country.extra.dial_code === countryCode
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
          <Phone name="fax" label="Fax" required />
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
          <FormIndustry
            saveData={(data) => setIndustry([...(industry as any[]), data])}
          />
          <IndustryTable
            data={industry}
            deleteItem={deleteItem}
            primaryItem={primaryItem}
          />
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
