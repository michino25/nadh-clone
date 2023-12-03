import { Form, Select } from "antd";
import { iOption } from "_constants/index";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  data: iOption[];
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
        {data?.map((item: iOption) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
