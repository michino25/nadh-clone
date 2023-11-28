import { Form, Select } from "antd";
import type { SelectProps } from "antd";

interface iData {
  label: string;
  name: string;
  required: boolean;
  defaultValue?: string | number;
  value: string[];
  setValue: (data: string[]) => void;
  options: {
    label: string;
    value: string;
  }[];
}

export default function MultiSelect({
  label,
  name,
  required,
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
  };

  return (
    <Form.Item
      label={label}
      name={name}
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
