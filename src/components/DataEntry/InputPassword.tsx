import { Form, Input } from "antd";

interface iDataInput {
  label: string;
  name: string;
  required: boolean;
}

export default function DataInputPassword({
  label,
  name,
  required,
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
      <Input.Password />
    </Form.Item>
  );
}
