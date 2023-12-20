import { iOption } from "_constants/index";
import { Button, Col, Row, Form } from "antd";
import { DataSelect } from "components/DataEntry";
import { useState } from "react";

interface iDataInput {
  name: string;
  placeholder: string;
  value: string;
  data: iOption[];
  onSubmit: (value: any) => void;
  editing: any;
  setEditing: (value: any) => void;
  prevent?: boolean;
}

export default function EditableForm({
  name,
  placeholder,
  value,
  data,
  onSubmit,
  editing,
  setEditing,
  prevent = false,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  // console.log(data);
  // console.log(value);

  const showData =
    data.length > 0 ? data.filter((item) => item.value === value)[0] : null;
  console.log(showData);

  // const transData = data.map((item) => ({
  //   ...item,
  //   value: JSON.stringify(item),
  // }));

  const closeEdit = () => {
    setEdit(false);
    if (!(prevent && showData?.value === "12")) setEditing(false);
  };

  return (
    <>
      {!edit ? (
        <button
          className="text-black p-0 m-0 w-full text-left"
          onClick={() => {
            if (!editing) {
              setEdit(true);
              setEditing(true);
            } else if (prevent && showData?.value === "12") {
              setEdit(true);
              setEditing(true);
            }
          }}
        >
          {showData ? showData.label : "-"}
        </button>
      ) : (
        <Form
          name="global_state"
          onFinish={(values: any) => {
            onSubmit(values);
            closeEdit();
          }}
          className="w-full mr-5"
        >
          <Row gutter={16}>
            <Col span={24}>
              <DataSelect
                placeholder={placeholder}
                label=""
                name={name}
                defaultValue={value}
                data={data}
              />
            </Col>
          </Row>

          <Row gutter={16} justify={"end"} className="gap-3 pr-2">
            <Form.Item>
              <Button
                onClick={() => {
                  closeEdit();
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
