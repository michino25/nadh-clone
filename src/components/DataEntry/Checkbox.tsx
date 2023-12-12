import { Form, Checkbox } from "antd";

interface iDataInput {
  label?: string;
  name: string;
  placeholder: string;
  defaultValue?: boolean;
  disabled?: boolean;
}

export default function CheckboxData({
  label,
  name,
  defaultValue,
  placeholder,
  disabled,
}: iDataInput) {
  return (
    <Form.Item label={label} name={name} initialValue={defaultValue}>
      <Checkbox disabled={disabled}>{placeholder}</Checkbox>
    </Form.Item>
  );
}
