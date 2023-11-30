import { Row, Col, Button, Form, Skeleton } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "../../utils/getUser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/DataEntry/Input";
import Birthday from "../components/DataEntry/Birthday";
import DataRadio from "../components/DataEntry/Radio";
import DataSelect from "../components/DataEntry/Select";
import DataUpload from "../components/DataEntry/Upload";

import Notification from "../components/DataDisplay/Notification";
import { useState } from "react";

const api = import.meta.env.VITE_API_URL;

interface ItemProps {
  label: string;
  value: string | number;
}

const createSelectData = (data: string[]) => {
  const selectData: ItemProps[] = [];
  for (let i = 0; i < data.length; i++) {
    selectData.push({
      label: data[i],
      value: i + 1,
    });
  }
  return selectData;
};

const gender = ["Male", "Female", "Complicated"];

export default function UserAdd() {
  const navigate = useNavigate();

  const [notiShow, setNotiShow] = useState(false);
  const [notiData, setNotiData] = useState<{
    title: string;
    content: string;
  }>();

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

  const createUser = async (userData: any) => {
    try {
      await axios.post(api + `users`, userData, {
        headers: {
          Authorization: `Bearer ${getUser()?.token}`,
        },
      });

      // success
      // console.log(res.data);
      setNotiData({
        title: "Create User",
        content: "Create success",
      });
      setNotiShow(true);
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      // error
      // console.error("Create failed", error);
      setNotiData({
        title: "Create User",
        content: "Create failed",
      });
      setNotiShow(true);
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createUser(formData),
  });

  const onFinish = (values: any) => {
    const dob =
      values.birthday.year && values.birthday.month && values.birthday.day
        ? `${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`
        : null;

    const data = {
      ...values,
      mediafiles: { avatar: "" },
      dob: dob,
      phone: { number: values.phone, country_id: 1280 },
    };
    createMutation.mutate(data);
    console.log("Received values of form: ", data);
  };

  if (rolePending) return <Skeleton active />;

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/users"}>Users List</Link>
        <span> / Create User</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create User</p>

      <div className="p-4 my-6 bg-white rounded-lg">
        <Form layout="vertical" className="w-full" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <DataUpload label="Avatar" />
            </Col>

            <Col span={12}></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input label="Full name" name="full_name" required={true} />
            </Col>
            <Col span={12}>
              <Input label="Username" name="user_name" required={true} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Birthday defaultValue={undefined} />
            </Col>
            <Col span={12}>
              <Input label="Mobile Phone" name="phone" required={true} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataRadio
                name="gender"
                label="Gender"
                data={createSelectData(gender)}
              />
            </Col>
            <Col span={12}>
              <DataRadio
                name="status"
                disabled
                defaultValue={1}
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
              <Input label="Email" type="email" name="email" required={true} />
            </Col>
            <Col span={12}>
              <Input
                label="Address"
                name="address"
                placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower"
                required={false}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="Role"
                name="type"
                required={true}
                data={roleData}
              />
            </Col>
            <Col span={12}></Col>
          </Row>

          <Form.Item className="flex justify-end space-x-2">
            {/* <Button
            className="mr-2"
            onClick={() => {
              setModalShow(true);
              console.log("hello");
              setNotiData({
                title: "Update User",
                content: "Update failed",
              });
            }}
          >
            Cancel
          </Button> */}
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Notification
        status={notiShow}
        setStatus={setNotiShow}
        notiData={notiData}
      />
    </div>
  );
}
