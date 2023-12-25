import { Form, Select } from "antd";
import { iOption } from "_constants/index";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  allowClear?: boolean;
  defaultValue?: string | number;
  placeholder: string;
  data: iOption[];
  disable?: boolean;
  multiple?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

const filterOption = (input: string, option?: iOption) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function DataSelect({
  label,
  name,
  required,
  allowClear = true,
  defaultValue,
  placeholder,
  data,
  disable,
  multiple,
  value,
  onChange,
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
        allowClear={allowClear}
        value={value}
        onChange={(value) => onChange && onChange(value)}
        disabled={disable}
        options={data}
        showSearch
        mode={multiple ? "multiple" : undefined}
        placeholder={placeholder}
      />
    </Form.Item>
  );
}
