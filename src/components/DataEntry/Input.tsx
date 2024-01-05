import { Form, Input } from "antd";

interface iDataInput {
  label?: string;
  name: string;
  type?: string | undefined;
  placeholder: string;
  required?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  disabled?: boolean;
}

export default function DataInput({
  label,
  name,
  required,
  defaultValue,
  value,
  type,
  placeholder,
  disabled,
}: iDataInput) {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          type: type as any,
          message: `The input is not valid ${label}!`,
        },
        {
          required: required,
          message: label ? `Please input your ${label}!` : "Missing this field",
        },
      ]}
    >
      <Input
        className=""
        placeholder={placeholder}
        disabled={disabled}
        value={value}
      />
    </Form.Item>
  );
}
