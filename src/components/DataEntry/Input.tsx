import { Form, Input } from "antd";

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
}

export default function DataInput({
  label,
  name,
  required,
  defaultValue,
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
      <Input className="" defaultValue={defaultValue} disabled={disabled} />
    </Form.Item>
  );
}
