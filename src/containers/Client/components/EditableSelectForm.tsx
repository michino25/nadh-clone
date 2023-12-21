import { iOption } from "_constants/index";
import { Button, Col, Row, Form, Tag } from "antd";
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
  option?: "tag";
}

export default function EditableForm({
  name,
  placeholder,
  value,
  data,
  onSubmit,
  editing,
  setEditing,
  option,
  prevent = false,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  // console.log(data);
  // console.log(value);

  const showData =
    data.length > 0 ? data.filter((item) => item.value === value)[0] : null;
  console.log(showData);

  const closeEdit = () => {
    setEdit(false);
    if (!(prevent && showData?.value === "12")) setEditing(false);
  };

  return (
    <>
      {!edit ? (
        <button
          onClick={() => {
            setEdit(true);
            setEditing(true);
          }}
          className={
            "text-black p-0 m-0 w-full text-left " +
            (editing &&
              !(prevent && showData?.value === "12") &&
              "cursor-not-allowed")
          }
          disabled={editing && !(prevent && showData?.value === "12")}
        >
          {showData ? (
            option === "tag" ? (
              <Tag
                color={
                  showData.label === "Active"
                    ? "success"
                    : showData.label === "Off - limit"
                    ? "processing"
                    : showData.label === "Inactive"
                    ? "error"
                    : "default"
                }
              >
                {showData.label}
              </Tag>
            ) : (
              showData.label
            )
          ) : (
            "-"
          )}
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
