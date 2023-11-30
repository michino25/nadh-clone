import { Form, Input } from "antd";

interface iDataInput {
  label: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function TextArea({
  label,
  placeholder,
  defaultValue,
}: iDataInput) {
  return (
    <Form.Item label={label} initialValue={defaultValue}>
      <Input.TextArea rows={4} placeholder={placeholder} />
    </Form.Item>
  );
}
