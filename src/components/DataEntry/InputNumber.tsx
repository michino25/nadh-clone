import { Form, InputNumber } from "antd";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
}

interface iDataInput {
  label: string;
}

export default function DataInputNumber({
  label,
  name,
  required,
  defaultValue,
  placeholder,
  disabled,
}: iDataInput) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: `Please input your ${label}!`,
        },
      ]}
    >
      <InputNumber
        style={{ width: "100%" }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Form.Item>
  );
}
