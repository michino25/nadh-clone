import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "../../../utils/getUser";
import axios from "axios";
import { useState } from "react";

const api = import.meta.env.VITE_API_URL;

interface iDataInput {
  label?: string;
  name: string;
  type?: string | undefined;
  placeholder?: string;
  required?: boolean | undefined;
  defaultValue?: string[];
  disabled?: boolean;
}

interface iSelect {
  value: string;
  label: string;
}

const App = ({ required, defaultValue = [""], disabled, name }: iDataInput) => {
  const [cities, setCities] = useState<iSelect[]>([]);
  const [district, setDistrict] = useState<iSelect[]>([]);

  const getCity = async (id: any) => {
    try {
      const res = await axios.get(
        api + `locations?type=1&parent_id=${id}&limit=500`,
        {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        }
      );

      // success
      // {key: 1, label: 'An Giang'}
      setCities(
        res.data.data.map((item: any) => ({
          value: item.key + "_" + item.label,
          label: item.label,
        }))
      );
    } catch (error) {
      // error
      console.error("Create failed", error);
    }
  };

  const getDistrict = async (id: any) => {
    try {
      const res = await axios.get(
        api + `locations?type=2&parent_id=${id}&limit=500`,
        {
          headers: {
            Authorization: `Bearer ${getUser()?.token}`,
          },
        }
      );

      // success
      // {key: 1, label: 'An Giang'}
      setDistrict(
        res.data.data.map((item: any) => ({
          value: item.key + "_" + item.label,
          label: item.label,
        }))
      );
    } catch (error) {
      // error
      console.error("Create failed", error);
    }
  };

  const getCityMutation = useMutation({
    mutationFn: (formData: any) => getCity(formData),
  });

  const getDistrictMutation = useMutation({
    mutationFn: (formData: any) => getDistrict(formData),
  });

  const handleChangeCountry = (value: string) => {
    getCityMutation.mutate(value.split("_")[0]);
  };

  const handleChangeCity = (value: string) => {
    getDistrictMutation.mutate(value.split("_")[0]);
  };

  return (
    <Form.Item
      label="Address"
      className="mb-0"
      name={name}
      rules={[
        {
          required: required,
          message: "Missing this field",
        },
      ]}
    >
      <Form.List name={name} initialValue={defaultValue}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <div className="flex space-x-4">
                <div
                  key={key}
                  className="flex-col w-full justify-between items-center"
                >
                  <div className="flex w-full space-x-3">
                    <Form.Item
                      name={[name, "country"]}
                      className="w-full mb-3"
                      rules={[
                        {
                          required: required,
                          message: `Please input your your Country!`,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Country"
                        onChange={handleChangeCountry}
                        options={[
                          {
                            value: "1280_Viet Nam",
                            label: "Viet Nam",
                          },
                          {
                            value: "1281_Nhat Ban",
                            label: "Nhat Ban",
                          },
                          {
                            value: "1282_Han Quoc",
                            label: "Han Quoc",
                          },
                          {
                            value: "1283_Trung Quoc",
                            label: "Trung Quoc",
                          },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      name={[name, "city"]}
                      className="w-full mb-3"
                      rules={[
                        {
                          required: required,
                          message: `Please input your your City!`,
                        },
                      ]}
                    >
                      <Select
                        options={cities}
                        onChange={handleChangeCity}
                        placeholder="City"
                      />
                    </Form.Item>

                    <Form.Item
                      name={[name, "district"]}
                      className="w-full mb-3"
                      rules={[
                        {
                          required: required,
                          message: `Please input your your District!`,
                        },
                      ]}
                    >
                      <Select options={district} placeholder="District" />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name={[name, "address"]}
                    className="w-full mb-3"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Address..."
                      className="w-full"
                      disabled={disabled}
                    />
                  </Form.Item>
                </div>
                <MinusCircleOutlined
                  className="hover:text-red-500 pb-3"
                  onClick={() => remove(name)}
                />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default App;
