// import { useParams, Link } from "react-router-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Button, Form, Skeleton, notification } from "antd";

import DataUpload from "components/DataEntry/Upload";
import Input from "components/DataEntry/Input";
import DataSelect from "components/DataEntry/Select";
import Birthday from "components/DataEntry/Birthday";
import DataRadio from "components/DataEntry/Radio";
import DataDatePicker from "components/DataEntry/DatePicker";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "utils/getUser";
import axios from "utils/axiosConfig";
import ChangePassword from "components/ChangePassword";

const gender = ["Male", "Female", "Complicated"];

const createSelectData = (data: string[]) => {
  const selectData: any[] = [];
  for (let i = 0; i < data.length; i++) {
    selectData.push({
      label: data[i],
      value: i + 1,
    });
  }
  return selectData;
};

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["users", id],
    queryFn: () =>
      axios.get("api/users/" + id).then((res) => {
        console.log(res.data);

        return res.data;
      }),
  });

  const { data: roleData, isPending: rolePending } = useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      axios.get("api/roles").then((res) => {
        return res.data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
      }),
  });

  const updateUser = async (userData: any) => {
    try {
      await axios.put("api/users/" + id, {
        params: userData,
      });

      // success
      // console.log(res.data);
      notification.success({
        message: "Update User",
        description: "Update success.",
      });

      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update User",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateUser(formData),
  });

  const onFinish = (values: any) => {
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
      <div className="pt-2 px-8">
        <Link to={"/users"}>Users List</Link>
        <span> / System User Detail</span>
      </div>
      {/* <div className="flex w-full p-5">Detail {id}</div> */}
      <div className="px-8 my-5">
        <div className="p-4 bg-white rounded-lg">
          <p className="mb-4 font-bold text-lg">System User Detail</p>

          <Form layout="vertical" className="w-full" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <DataUpload label="Avatar" />
              </Col>

              {id == getUser()?.user_sent.user_id ? (
                <Col span={12}>
                  <ChangePassword />
                </Col>
              ) : (
                <Col span={12}>
                  <Form.Item className="flex justify-end">
                    <Button
                      onClick={() => {
                        // setOpen(true);
                      }}
                    >
                      Reset Password
                    </Button>
                  </Form.Item>
                </Col>
              )}
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
                  data={createSelectData(gender)}
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
                  placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower"
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
      </div>
    </>
  );
}
