import { Form, Select } from "antd";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  data: { label: string; value: string }[];
}

export default function DataSelect({
  label,
  name,
  required,
  defaultValue,
  data,
}: iDataInput) {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input your your ${label}!`,
        },
      ]}
    >
      <Select>
        {data?.map((item: { label: string; value: string }) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
