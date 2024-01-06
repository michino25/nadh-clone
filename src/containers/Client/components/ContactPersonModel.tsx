import { Button, Form, Row, Col, Skeleton } from "antd";
import CheckboxData from "components/DataEntry/Checkbox";
import Input from "components/DataEntry/Input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "apis/index";

const App = ({
  closeModal,
  edit = false,
  execute,
  onDelete,
  id,
}: {
  closeModal: () => void;
  edit?: boolean;
  execute: (data: any, id?: string) => void;
  onDelete?: (id: string) => void;
  id?: string;
}) => {
  const { data: dataContactPersons, isPending } = useQuery({
    queryKey: ["ContactPerson", id],
    queryFn: () =>
      clientApi.getContactPersons(id as string).then((res) => res.data),
    enabled: !!id,
  });

  const onFinish = (values: any) => {
    const outputData = {
      ...values,
      phone_codes: {
        key: "1280",
        label: "Viet Nam",
        extra: {
          code: "VN",
          dial_code: "+84",
        },
      },
      name: values.name,
      title: values.title,
      email: values.email,
      telephone: values.phone,
      mobile_phone: values.mobile_phone,
      fax: values.fax,
      department: values.department,
      jobs_count: null,
      role: 1,
      ...(values.current === true && { current: "true" }),
    };

    edit ? execute(outputData, id) : execute(outputData);
    console.log("Received values of form: ", outputData);
  };

  const [checkbox, setCheckbox] = useState(
    dataContactPersons?.current === "true"
  );

  console.log(dataContactPersons);

  if (isPending && !!id) return <Skeleton className="p-12" active />;

  return (
    <Form
      layout="vertical"
      preserve={false}
      className="w-full"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <CheckboxData
            name="current"
            placeholder="Current Contact"
            checked={checkbox}
            onChange={setCheckbox}
            defaultValue={checkbox}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            placeholder="Name"
            label="Name"
            name="name"
            required
            defaultValue={dataContactPersons?.name}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Title"
            label="Title"
            name="title"
            required
            defaultValue={dataContactPersons?.title}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            placeholder="Mobile"
            label="Mobile Phone"
            name="mobile_phone"
            defaultValue={dataContactPersons?.mobile_phone}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Email"
            label="Email"
            name="email"
            required
            type="email"
            defaultValue={dataContactPersons?.email}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            placeholder="Telephone"
            label="Telephone"
            name="phone"
            defaultValue={dataContactPersons?.telephone}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Fax"
            label="Fax"
            name="fax"
            defaultValue={dataContactPersons?.fax}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            placeholder="Department"
            label="Department"
            name="department"
            defaultValue={dataContactPersons?.department}
          />
        </Col>
        <Col span={12}>
          <Input
            label="Job(s)"
            placeholder={dataContactPersons?.jobs.length || "Job(s)"}
            name="jobs_count"
            disabled
          />
        </Col>
      </Row>

      <Row gutter={16} justify={edit ? "space-between" : "end"}>
        {edit && (
          <Col>
            <Button
              type="primary"
              danger
              onClick={() => onDelete && onDelete(dataContactPersons?.id)}
            >
              Delete
            </Button>
          </Col>
        )}
        <Col>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="primary" htmlType="submit" className="ml-3">
            {edit ? "Save" : "Add"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default App;
