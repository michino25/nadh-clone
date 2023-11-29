import { Form, Input } from "antd";

interface iDataInput {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
}

export default function DataInput({
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
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input your ${label}!`,
        },
      ]}
    >
      <Input className="" placeholder={placeholder} disabled={disabled} />
    </Form.Item>
  );
}
