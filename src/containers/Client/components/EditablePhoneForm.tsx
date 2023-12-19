import { Button, Col, Form } from "antd";
import Phone from "components/DataEntry/Phone";
import { useState } from "react";

interface iDataInput {
  name: string;
  value: any;
  onSubmit: (value: any) => void;
}

export default function EditableForm({ name, value, onSubmit }: iDataInput) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {!edit ? (
        <button
          className="text-black p-0 m-0 w-full text-left"
          onClick={() => setEdit(true)}
        >
          {value.phone_code.extra.dial_code + " " + value.number || "-"}
        </button>
      ) : (
        <Form
          name="global_state"
          layout="inline"
          onFinish={(values: any) => {
            onSubmit(values);
            setEdit(false);
          }}
          className="w-[600px]"
        >
          <Col span={12}>
            <Phone name={name} defaultValue={value} />
          </Col>

          <Form.Item className="ml-3">
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
