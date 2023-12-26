import { Form, InputNumber } from "antd";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder: string;
  disabled?: boolean;
  formatter?: any;
  suffix?: any;
}

export default function DataInputNumber({
  label,
  name,
  required,
  formatter,
  defaultValue,
  placeholder,
  disabled,
  suffix,
}: iDataInput) {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input your ${label}!`,
        },
      ]}
    >
      <InputNumber
        style={{ width: "100%" }}
        min={0}
        formatter={formatter}
        placeholder={placeholder}
        disabled={disabled}
        suffix={suffix}
      />
    </Form.Item>
  );
}
