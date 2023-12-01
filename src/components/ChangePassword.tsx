import { Button, Form, Modal, notification } from "antd";
import InputPassword from "components/DataEntry/InputPassword";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "utils/axiosConfig";

import { useParams } from "react-router-dom";

export default function ChangePassword() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const updateUser = async (userData: any) => {
    try {
      await axios.put("api/users/" + id + "/password", {
        params: userData,
      });

      // success
      // console.log(res.data);
      notification.success({
        message: "Update Password",
        description: "Update success.",
      });
      setOpen(false);
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Password",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateUser(formData),
  });

  const onCreate = (values: any) => {
    if (values.new_password === values.re_new_password) {
      const data = {
        new_password: values.new_password,
        old_password: values.old_password,
      };
      updateMutation.mutate(data);
      // console.log("Received values of form: ", data);
    }
  };

  return (
    <>
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
              name="old_password"
              required={true}
            />
            <InputPassword
              label="New password"
              name="new_password"
              required={true}
            />
            <InputPassword
              label="Confirm new password"
              name="re_new_password"
              required={true}
            />
          </Form>
        </Modal>
      </Form.Item>
    </>
  );
}
