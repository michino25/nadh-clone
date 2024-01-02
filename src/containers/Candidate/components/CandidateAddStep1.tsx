import { Modal, Button, Form, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { candidateApi } from "apis/index";
import PersonalInformationForm from "./PersonalInformationForm";
import { useState } from "react";

export default function CandidateAddStep1({
  nextStep,
}: {
  nextStep: () => void;
}) {
  // const navigate = useNavigate();
  const [address, setAddress] = useState<any[]>();

  const createCandidate = async (userData: any) => {
    try {
      await candidateApi.createCandidate(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Candidate",
        description: "Create success.",
      });

      setTimeout(() => {
        nextStep();
        // navigate("/candidates");
      }, 1000);
    } catch (error: any) {
      // error
      // console.error("Create failed", error);
      notification.error({
        message: "Create Candidate",
        description: `Create failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createCandidate(formData),
  });

  const onFinish = (values: any) => {
    const dob =
      values.birthday.year && values.birthday.month && values.birthday.day
        ? `${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`
        : null;

    const data = {
      ...values,
      addresses: values.addresses.map((item: any) => ({
        address: item.address,
        city: item.city
          ? { key: item.city.split("_")[0], label: item.city.split("_")[1] }
          : null,
        country: item.country
          ? {
              key: item.country.split("_")[0],
              label: item.country.split("_")[1],
            }
          : null,
        district: item.district
          ? {
              key: item.district.split("_")[0],
              label: item.district.split("_")[1],
            }
          : null,
      })),
      dob: dob,
      gender: parseInt(values.gender),
      highest_education: values.highest_education
        ? {
            key: values.highest_education.split("_")[0],
            label: values.highest_education.split("_")[1],
          }
        : null,
      phones: values.phones.map((item: any) => ({
        number: item,
        current: -1,
        phone_code: { key: 1280 },
      })),

      nationality: values.nationality.map((item: any) => ({
        key: item.split("_")[0],
        label: item.split("_")[1],
      })),

      prefer_position: values.prefer_position
        ? {
            positions: values.prefer_position.map((item: any) => ({
              key: item.split("_")[0],
              label: item.split("_")[1],
            })),
          }
        : null,

      priority_status: parseInt(values.priority_status),
      relocating_willingness: parseInt(values.relocating_willingness),
    };
    createMutation.mutate(data);
    // console.log("Received values of form: ", data);
  };

  const showConfirmSubmit = (values: any) => {
    Modal.confirm({
      title: "Confirm to create candidate",
      content: "Are you sure you want to create new candidate ?",
      onOk: () => onFinish(values),
    });
  };

  return (
    <Form layout="vertical" className="w-full" onFinish={showConfirmSubmit}>
      <PersonalInformationForm
        address={address}
        setAddress={setAddress}
        setReset={() => {}}
      />
      <Form.Item className="flex justify-end space-x-2">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
