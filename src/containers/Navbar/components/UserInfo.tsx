import { Row, Col, Button, Form, Skeleton, notification } from "antd";
import { useMutation } from "@tanstack/react-query";

import Input from "components/DataEntry/Input";
import Birthday from "components/DataEntry/Birthday";
import DataRadio from "components/DataEntry/Radio";
import DataSelect from "components/DataEntry/Select";
import DataUpload from "components/DataEntry/Upload";
import DataDatePicker from "components/DataEntry/DatePicker";

import { getUser } from "utils/getUser";
import { useQuery } from "@tanstack/react-query";
import ChangePassword from "./ChangePassword";
import { otherApi, userApi } from "apis/index";
import { createSelectData, gender } from "_constants/index";

export default function UserInfo() {
  const { data, isPending } = useQuery({
    queryKey: ["users", getUser().user_sent.id],
    queryFn: async () =>
      await userApi.getOneUser(getUser().user_sent.id).then((res) => res.data),
  });

  const { data: roleData, isPending: rolePending } = useQuery({
    queryKey: ["roles"],
    queryFn: async () =>
      await otherApi.getRoles().then((res) => {
        return res.data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
      }),
  });

  const updateUser = async (userData: any) => {
    try {
      await userApi.updateUser(getUser()?.user_sent.user_id, userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Update User",
        description: "Update success.",
      });
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
              placeholder="Full name"
              name="full_name"
              required={true}
              defaultValue={data?.full_name}
            />
          </Col>
          <Col span={12}>
            <Input
              label="Username"
              placeholder="Username"
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
              placeholder="Mobile Phone"
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
              placeholder="Email"
              name="email"
              required={true}
              defaultValue={data.email}
            />
          </Col>
          <Col span={12}>
            <Input
              label="Address"
              placeholder="Address"
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
              placeholder="Role"
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
    </>
  );
}
