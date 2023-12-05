import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Input from "components/DataEntry/Input";

const App = ({
  data,
  setData,
}: {
  data: any;
  setData: (value: any) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values: any) => {
    setIsModalOpen(false);
    setData([...data, values]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-end mb-5">
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          New Contact
        </Button>
      </div>
      <Modal title="Add Contact Person" open={isModalOpen} footer={null}>
        <Form layout="vertical" className="w-full" onFinish={handleOk}>
          <Row gutter={16}>
            <Col span={12}>
              <Input label="Name" name="name" required />
            </Col>
            <Col span={12}>
              <Input label="Title" name="title" required />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input label="Mobile Phone" name="mobile_phone" />
            </Col>
            <Col span={12}>
              <Input label="Email" name="email" required />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input label="Telephone" name="phone" />
            </Col>
            <Col span={12}>
              <Input label="Fax" name="fax" />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="Job(s)"
                name="jobs_count"
                disabled
                defaultValue={"0"}
              />
            </Col>
          </Row>

          <div className="w-full flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default App;
