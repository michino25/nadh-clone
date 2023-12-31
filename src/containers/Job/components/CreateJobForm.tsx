import { Col, Row, Form } from "antd";

import InputNumber from "components/DataEntry/InputNumber";
import DataSelect from "components/DataEntry/Select";
import Birthday from "components/DataEntry/Birthday";
import { experiences, typeJob } from "_constants/index";
import { formatName } from "utils/format";
import { clientApi, userApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "components/DataEntry";
import Address from "components/DataEntry/Address";
import SelectWithSearchAPI from "components/DataEntry/SelectWithSearchAPI";
import { iAddress } from "utils/models";

export default function CreateJobForm({
  setAddress,
  defaultClient,
}: {
  setAddress?: (data: iAddress) => void;
  defaultClient?: string;
}) {
  const { data: userData } = useQuery({
    queryKey: ["all_users"],
    queryFn: async () => userApi.getUsers({}),
    select: (res) =>
      res.data.data.map((item: { id: string; full_name: string }) => ({
        value: item.id,
        label: formatName(item.full_name),
      })),
  });

  const { data: clientData, isLoading } = useQuery({
    queryKey: ["all_clients"],
    queryFn: async () => clientApi.getClients({}),
    select: (res) =>
      res.data.data.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: formatName(item.name),
      })),
  });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <SelectWithSearchAPI
            label="Title"
            placeholder="Select or add title"
            name="title"
            required
            allowClear
            propertyName="position"
          />
        </Col>
        <Col span={12}>
          <SelectWithSearchAPI
            label="Department"
            placeholder="Select or add department"
            name="department"
            required
            allowClear
            propertyName="department"
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <InputNumber
            label="Quantity"
            placeholder="Quantity"
            name="quantity"
            required
          />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Type"
            placeholder="Type"
            name="type"
            required
            data={typeJob}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Experience Level"
            placeholder="Experience Level"
            name="experience_level"
            required
            data={experiences}
          />
        </Col>
        <Col span={12}>
          <DataSelect
            label="Client's Name"
            placeholder="Client's Name"
            name="client_id"
            required
            data={
              defaultClient && isLoading
                ? [{ value: defaultClient, label: "Client's Name" }]
                : clientData
            }
            loading={!!defaultClient && isLoading}
            defaultValue={defaultClient}
            disable={!!defaultClient}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Birthday
            label="Opening Date"
            name="target_date"
            // defaultValue="2023-01-01"
          />
        </Col>
        <Col span={12}>
          <Form.Item label="Location" name="address">
            <Address
              onChange={(value) => setAddress && setAddress(value)}
              onlyCity
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DataSelect
            label="Search Consultant"
            placeholder="Search Consultant"
            name="recruiters"
            required
            data={userData}
          />
        </Col>
        <Col span={12}>
          <MultiSelect
            label="Mapping by"
            placeholder="Mapping by"
            name="related_users"
            options={userData}
            required={false}
            allowClear
          />
        </Col>
      </Row>
    </>
  );
}
