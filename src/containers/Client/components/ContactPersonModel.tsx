import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Input from "components/DataEntry/Input";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
      <Modal
        title="Add Contact Person"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" className="w-full" onFinish={() => {}}>
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
              <Input label="Job(s)" name="jobs_count" />
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default App;
