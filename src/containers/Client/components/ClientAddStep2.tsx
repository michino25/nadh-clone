import { Modal, Button, Form, notification } from "antd";

import { useState } from "react";
import ContactPerson from "./ContactPerson";
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "apis/index";

export default function CandidateAddStep1({
  nextStep,
  prevStep,
  step1Data,
}: {
  step1Data: any;
  nextStep: () => void;
  prevStep: () => void;
}) {
  const [contact, setContact] = useState<any[]>([]);

  const createContactPersons = async (userData: any) => {
    try {
      await clientApi.createContactPersons(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Client",
        description: "Create success.",
      });

      setTimeout(() => {
        nextStep();
        // navigate("/Clients");
      }, 1000);
    } catch (error: any) {
      // error
      // console.error("Create failed", error);
      notification.error({
        message: "Create Client",
        description: `Create failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createContactPersons(formData),
  });

  const onFinish = () => {
    const { name, title, mobile_phone, email, phone, fax } = contact[0];

    const transformedData = {
      phone_codes: {
        key: "1280",
        label: "Viet Nam",
        extra: {
          code: "VN",
          dial_code: "+84",
        },
      },
      name,
      title,
      email,
      telephone: phone,
      mobile_phone,
      fax,
      department: "",
      client_id: step1Data.data.id,
      role: 1,
      id: 0,
      jobs_count: null,
    };

    createMutation.mutate(transformedData);
    console.log("Received values of form: ", transformedData);
  };

  const showConfirmSubmit = () => {
    Modal.confirm({
      title: "Confirm to create client",
      content: "Are you sure you want to create new client ?",
      onOk: () => onFinish(),
    });
  };

  return (
    <Form layout="vertical" className="w-full">
      <Form.Item className="flex-col space-x-2 mt-5 w-full">
        <ContactPerson data={contact} setData={setContact} />

        <div className="w-full flex justify-end mt-5">
          <Button onClick={prevStep} className="mr-2">
            Previous
          </Button>
          {contact.length > 0 && (
            <Button
              onClick={showConfirmSubmit}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          )}
        </div>
      </Form.Item>
    </Form>
  );
}
