import { Form, DatePicker } from "antd";

interface iDataInput {
  label: string;
  disabled?: boolean;
}

export default function DataDatePicker({ label, disabled }: iDataInput) {
  return (
    <Form.Item label={label}>
      <DatePicker className="w-full" disabled={disabled} />
    </Form.Item>
  );
}
