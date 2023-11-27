import { Form, DatePicker } from "antd";

interface iDataInput {
  label: string;
}

export default function DataDatePicker({ label }: iDataInput) {
  return (
    <Form.Item label={label}>
      <DatePicker className="w-full" />
    </Form.Item>
  );
}
