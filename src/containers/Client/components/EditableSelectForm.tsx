import { iOption } from "_constants/index";
import { Button, Col, Form } from "antd";
import { DataSelect } from "components/DataEntry";
import { useState } from "react";

interface iDataInput {
  name: string;
  value: string;
  data: iOption[];
  onSubmit: (value: any) => void;
}

export default function EditableForm({
  name,
  value,
  data,
  onSubmit,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  const showData = data.filter((item) => item.value === value)[0];
  // const transData = data.map((item) => ({
  //   ...item,
  //   value: JSON.stringify(item),
  // }));

  return (
    <>
      {!edit ? (
        <button className="text-black p-0 m-0" onClick={() => setEdit(true)}>
          {showData.label}
        </button>
      ) : (
        <Form
          name="global_state"
          layout="inline"
          onFinish={(values: any) => {
            onSubmit(values);
            setEdit(false);
          }}
          className="w-[500px]"
        >
          <Col span={12}>
            <DataSelect
              placeholder=""
              label=""
              name={name}
              defaultValue={value}
              data={data}
            />
          </Col>

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
