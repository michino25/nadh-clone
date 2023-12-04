import { Button, Form, Input } from "antd";
import { useState } from "react";

export default function EditableForm({
  value,
  onSubmit,
}: {
  value: string;
  onSubmit: (value: any) => void;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit ? (
        <Button type="text" onClick={() => setEdit(true)}>
          {value}
        </Button>
      ) : (
        <Form name="global_state" layout="inline" onFinish={onSubmit}>
          <Form.Item
            initialValue={value}
            name="username"
            rules={[{ required: true, message: "Username is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
