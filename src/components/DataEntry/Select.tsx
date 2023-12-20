import { Form, Select } from "antd";
import { iOption } from "_constants/index";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder: string;
  data: iOption[];
  disable?: boolean;
  value?: any;
  setChange?: (value: any) => void;
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
  disable,
  value,
  setChange,
}: iDataInput) {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input ${placeholder || label}!`,
        },
      ]}
    >
      <Select
        filterOption={filterOption}
        allowClear
        value={value}
        onChange={(e) => setChange && setChange(e.target.value)}
        disabled={disable}
        options={data}
        showSearch
        placeholder={placeholder}
      />
    </Form.Item>
  );
}
