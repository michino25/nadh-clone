import { Form, Checkbox } from "antd";

interface iDataInput {
  label?: string;
  name: string;
  placeholder: string;
  defaultValue?: boolean;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

export default function CheckboxData({
  label,
  name,
  defaultValue,
  placeholder,
  disabled,
  checked,
  onChange,
}: iDataInput) {
  return (
    <Form.Item
      valuePropName="checked"
      label={label}
      name={name}
      initialValue={defaultValue}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
      >
        {placeholder}
      </Checkbox>
    </Form.Item>
  );
}
