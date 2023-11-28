import { useParams, Link } from "react-router-dom";
import { Col, Row, Button, Form, Modal } from "antd";
import { useState } from "react";

import DataUpload from "../components/DataEntry/Upload";
import Input from "../components/DataEntry/Input";
import DataSelect from "../components/DataEntry/Select";
import Birthday from "../components/DataEntry/Birthday";
import DataRadio from "../components/DataEntry/Radio";
import InputPassword from "../components/DataEntry/InputPassword";
import DataDatePicker from "../components/DataEntry/DatePicker";

interface ItemProps {
  label: string;
  value: string;
}
const gender = ["Male", "Female", "Complicated"];

const createSelectData = (data: string[]) => {
  const selectData: ItemProps[] = [];
  for (let i = 0; i < data.length; i++) {
    selectData.push({
      label: data[i],
      value: i.toString(),
    });
  }
  return selectData;
};

export default function Candidates() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <>
      <div className="pt-2 px-8">
        <Link to={"/users"}>Users List</Link>
        <span> / System User Detail</span>
      </div>
      {/* <div className="flex w-full p-5">Detail {id}</div> */}
      <div className="px-8 my-5">
        <div className="p-4 bg-white rounded-lg">
          <p className="mb-4 font-bold text-lg">System User Detail</p>

          <Form layout="vertical" className="w-full">
            <Row gutter={16}>
              <Col span={12}>
                <DataUpload label="Avatar" />
              </Col>

              <Col span={12}>
                <Form.Item className="flex justify-end">
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Change Password
                  </Button>

                  <Modal
                    open={open}
                    title="Change Password"
                    okText="Save"
                    cancelText="Cancel"
                    onCancel={() => {
                      setOpen(false);
                    }}
                    onOk={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          form.resetFields();
                          onCreate(values);
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                  >
                    <Form
                      form={form}
                      layout="vertical"
                      name="form_in_modal"
                      initialValues={{ modifier: "public" }}
                    >
                      <InputPassword
                        label="Current password"
                        name="password"
                        required={true}
                      />
                      <InputPassword
                        label="New password"
                        name="password"
                        required={true}
                      />
                      <InputPassword
                        label="Confirm new password"
                        name="password"
                        required={true}
                      />
                    </Form>
                  </Modal>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Input
                  label="Full name"
                  name="full_name"
                  required={true}
                  defaultValue={"thanh binh"}
                />
              </Col>
              <Col span={12}>
                <Input
                  label="Username"
                  name="user_name"
                  required={true}
                  defaultValue={"thanhbinh"}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Birthday day="01" month="01" year="2023" />
              </Col>
              <Col span={12}>
                <Input
                  label="Mobile Phone"
                  name="phone"
                  required={true}
                  defaultValue={"0909888999"}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <DataRadio label="Gender" data={createSelectData(gender)} />
              </Col>
              <Col span={12}>
                <DataRadio
                  label="Status"
                  data={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Input
                  label="Email"
                  name="email"
                  required={true}
                  defaultValue={"thanhbinh@lubrytics.com"}
                />
              </Col>
              <Col span={12}>
                <Input
                  label="Address"
                  name="address"
                  required={true}
                  defaultValue={"ex: 2 Hai Trieu, Bitexco Financial Tower"}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <DataSelect
                  label="Role"
                  name="role"
                  required={true}
                  defaultValue="manager"
                  data={[
                    { label: "Manager", value: "manager" },
                    { label: "Staff", value: "staff" },
                  ]}
                />
              </Col>
              <Col span={12}>
                <DataDatePicker disabled label="Created on" />
              </Col>
            </Row>

            <Form.Item className="flex justify-end space-x-2">
              <Button className="mr-2">Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
