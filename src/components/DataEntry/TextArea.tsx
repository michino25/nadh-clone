import { Form, Input } from "antd";

interface iDataInput {
  label?: string;
  name: string;
  type?: "email";
  placeholder: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
}

export default function TextArea({
  label,
  name,
  required,
  defaultValue,
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
          type: type,
          message: `The input is not valid ${label}!`,
        },
        {
          required: required,
          message: label ? `Please input your ${label}!` : "Missing this field",
        },
      ]}
    >
      <Input.TextArea rows={4} placeholder={placeholder} disabled={disabled} />
    </Form.Item>
  );
}
