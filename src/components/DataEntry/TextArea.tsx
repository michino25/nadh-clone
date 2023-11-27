import { Form, Input } from "antd";

interface iDataInput {
  label: string;
  placeholder: string;
}

export default function TextArea({ label, placeholder }: iDataInput) {
  return (
    <Form.Item label={label}>
      <Input.TextArea rows={4} placeholder={placeholder} />;
    </Form.Item>
  );
}
