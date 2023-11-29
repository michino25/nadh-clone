import { useState } from "react";
import { Row, Col, Button, Form, Skeleton } from "antd";
import { useMutation } from "@tanstack/react-query";

import Input from "../DataEntry/Input";
import Birthday from "../DataEntry/Birthday";
import DataRadio from "../DataEntry/Radio";
import DataSelect from "../DataEntry/Select";
import DataUpload from "../DataEntry/Upload";
import DataDatePicker from "../DataEntry/DatePicker";

import Notification from "../DataDisplay/Notification";
import axios from "axios";
import { getUser } from "../../../utils/getUser";
import { useQuery } from "@tanstack/react-query";
import ChangePassword from "../ChangePassword";
// import ConfirmModal from "../DataDisplay/ConfirmModal";

const api = import.meta.env.VITE_API_URL;

const gender = [
  {
    label: "Male",
    value: 1,
  },
  {
    label: "Female",
    value: 2,
  },
  {
    label: "Complicated",
    value: 3,
  },
];

export default function UserInfo() {
  const [notiShow, setNotiShow] = useState(false);
  // const [modalShow, setModalShow] = useState(false);
  const [notiData, setNotiData] = useState<{
    title: string;
    content: string;
  }>();

  const { data, isPending } = useQuery({
    queryKey: ["users", getUser()?.user_sent.id],
    queryFn: () =>
      axios
        .get(api + `users/${getUser()?.user_sent.id}`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        })
        .then((res) => res.data),
  });

  const { data: roleData, isPending: rolePending } = useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      axios
        .get(api + `roles`, {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        })
        .then((res) => {
          return res.data.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
        }),
  });

  const updateUser = async (userData: any) => {
    try {
      await axios.put(api + `users/${getUser()?.user_sent.user_id}`, userData, {
        headers: {
          Authorization: `Bearer ${getUser()?.token}`,
        },
      });

      // success
      // console.log(res.data);
      setNotiData({
        title: "Update User",
        content: "Update success",
      });
      setNotiShow(true);
    } catch (error) {
      // error
      // console.error("Update failed", error);
      setNotiData({
        title: "Update User",
        content: "Update failed",
      });
      setNotiShow(true);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateUser(formData),
  });

  const onFinish = (values: any) => {
    // loginMutation.mutate(values);
    const data = {
      ...values,
      dob: `${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`,
      phone: { number: values.phone, country_id: 1280 },
    };
    updateMutation.mutate(data);
    console.log("Received values of form: ", data); // {username: 'a', password: 'a'}
  };

  if (isPending || rolePending) return <Skeleton active />;

  return (
    <>
      <Form layout="vertical" className="w-full" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <DataUpload label="Avatar" />
          </Col>

          <Col span={12}>
            <ChangePassword />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Input
              label="Full name"
              name="full_name"
              required={true}
              defaultValue={data?.full_name}
            />
          </Col>
          <Col span={12}>
            <Input
              label="Username"
              name="user_name"
              required={true}
              disabled
              defaultValue={data?.user_name}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Birthday defaultValue={data.dob} />
          </Col>
          <Col span={12}>
            <Input
              label="Mobile Phone"
              name="phone"
              required={true}
              defaultValue={data?.phone.number}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <DataRadio
              name="gender"
              defaultValue={data.gender}
              label="Gender"
              data={gender}
            />
          </Col>
          <Col span={12}>
            <DataRadio
              name="status"
              defaultValue={data.status}
              label="Status"
              data={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: -1 },
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
              defaultValue={data.email}
            />
          </Col>
          <Col span={12}>
            <Input
              label="Address"
              name="address"
              required={false}
              defaultValue={data.address}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <DataSelect
              label="Role"
              name="type"
              required={true}
              defaultValue={data.role.id}
              data={roleData}
            />
          </Col>
          <Col span={12}>
            <DataDatePicker
              name="createdAt"
              required={true}
              defaultValue={data.createdAt}
              label="Created on"
              disabled
            />
          </Col>
        </Row>

        <Form.Item className="flex justify-end space-x-2">
          <Button
            className="mr-2"
            onClick={() => {
              console.log("hello");
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <Notification
        status={notiShow}
        setStatus={setNotiShow}
        notiData={notiData}
      />
    </>
  );
}
