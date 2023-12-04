import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, Button, Form, Input, Skeleton } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { otherApi } from "apis/index";
import type { iOption } from "_constants/index";

interface iDataInput {
  label?: string;
  name: string;
  type?: string | undefined;
  placeholder?: string;
  required?: boolean | undefined;
  defaultValue?: string[];
  disabled?: boolean;
}

const App = ({ required, defaultValue = [""], disabled, name }: iDataInput) => {
  const [cities, setCities] = useState<iOption[]>([]);
  const [district, setDistrict] = useState<iOption[]>([]);

  const { data: countries, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) =>
        res.data.data.map((item: any) => ({
          value: item.key + "_" + item.label,
          label: item.label,
        }))
      ),
  });

  const getCity = async (id: any) => {
    try {
      const res = await otherApi.getLocation(1, id);

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
      const res = await otherApi.getLocation(2, id);

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

  if (isPending) return <Skeleton active />;

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
                        options={countries}
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
                        required: required,
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
