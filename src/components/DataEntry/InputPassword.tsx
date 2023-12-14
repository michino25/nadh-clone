import { Form, Input } from "antd";

interface iDataInput {
  label: string;
  name: string;
  dependencies?: string;
  placeholder: string;
  required: boolean;
}

export default function DataInputPassword({
  label,
  name,
  required,
  placeholder,
  dependencies,
}: iDataInput) {
  return (
    <Form.Item
      label={label}
      name={name}
      dependencies={[dependencies]}
      rules={[
        {
          required: required,
          message: `Please input your ${label}!`,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (dependencies)
              if (!value || getFieldValue(dependencies) === value) {
                return Promise.resolve();
              } else
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} />
    </Form.Item>
  );
}
