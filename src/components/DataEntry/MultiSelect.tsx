import { Form, Select } from "antd";
import type { SelectProps } from "antd";
import { iOption } from "_constants/index";

interface iData {
  label: string;
  name: string;
  required: boolean;
  allowClear?: boolean;
  defaultValue?: string | number;
  value: string[];
  setValue: (data: string[]) => void;
  options: iOption[];
}

export default function MultiSelect({
  label,
  name,
  required,
  defaultValue,
  allowClear = false,
  value,
  setValue,
  options,
}: iData) {
  const selectProps: SelectProps = {
    mode: "multiple",
    style: { width: "100%" },
    value: value,
    options,
    onChange: (newValue: string[]) => {
      setValue(newValue);
    },
    placeholder: "Select Item...",
    maxTagCount: "responsive",
    allowClear,
  };

  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      className="w-full"
      rules={[
        {
          required: required,
          message: `Please input your your ${label}!`,
        },
      ]}
    >
      <Select {...selectProps} />
    </Form.Item>
  );
}
