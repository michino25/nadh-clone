import { Form, InputNumber } from "antd";

interface iDataInput {
  label: string;
}

export default function DataInputNumber({ label }: iDataInput) {
  return (
    <Form.Item label={label}>
      <InputNumber />
    </Form.Item>
  );
}
