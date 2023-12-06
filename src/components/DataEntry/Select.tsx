import { Form, Select } from "antd";
import { iOption } from "_constants/index";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder: string;
  data: iOption[];
}

const filterOption = (input: string, option?: iOption) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function DataSelect({
  label,
  name,
  required,
  defaultValue,
  placeholder,
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
      <Select
        filterOption={filterOption}
        allowClear
        options={data}
        showSearch
        placeholder={placeholder}
      />
    </Form.Item>
  );
}
