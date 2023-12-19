import { Button, Col, Row, Form } from "antd";
import Phone from "components/DataEntry/Phone";
import { useState } from "react";

interface iDataInput {
  name: string;
  value: any;
  onSubmit: (value: any) => void;
  editing: any;
  setEditing: (value: any) => void;
}

export default function EditableForm({
  name,
  value,
  onSubmit,
  editing,
  setEditing,
}: iDataInput) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {!edit ? (
        <button
          className="text-black p-0 m-0 w-full text-left"
          onClick={() => {
            if (!editing) {
              setEdit(true);
              setEditing(true);
            }
          }}
        >
          {value.phone_code.extra.dial_code + " " + value.number || "-"}
        </button>
      ) : (
        <Form
          name="global_state"
          onFinish={(values: any) => {
            onSubmit(values);
            setEdit(false);
            setEditing(false);
          }}
          className="w-full mr-5"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Phone name={name} defaultValue={value} />
            </Col>
          </Row>

          <Row gutter={16} justify={"end"} className="gap-3 pr-2">
            <Form.Item>
              <Button
                onClick={() => {
                  setEdit(false);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
}
