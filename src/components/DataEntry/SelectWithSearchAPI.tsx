import { useMutation, useQuery } from "@tanstack/react-query";
import { Divider, Form, Select, Button, notification } from "antd";
import type { SelectProps } from "antd";
import { otherApi } from "apis/index";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

interface iData {
  label: string;
  name: string | string[];
  required: boolean;
  allowClear?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  propertyName: string;
}

export default function SelectWithSearchAPI({
  label,
  name,
  required,
  defaultValue,
  placeholder,
  allowClear,
  propertyName,
}: iData) {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState();

  useQuery({
    queryKey: [propertyName, searchValue],
    queryFn: async () =>
      await otherApi.getProperty(propertyName, searchValue).then((res) => {
        setSearchData(
          res.data.data.map((item: any) => ({
            label: item.label,
            value: item.key + "_" + item.label,
          }))
        );
      }),
  });

  const addProperty = async (data: any) => {
    try {
      await otherApi.addProperty(propertyName, data);

      // success
      notification.success({
        message: "Add " + label,
        description: "Add success.",
      });
    } catch (error: any) {
      // error
      notification.error({
        message: "Add " + label,
        description: `Add failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: (data: any) => addProperty(data),
  });

  const addItem = () => {
    const value = searchValue;
    createMutation.mutate(value);
  };

  const selectProps: SelectProps = {
    style: { width: "100%" },
    placeholder: placeholder || "Select Item...",
    options: searchData,
    onBlur: () =>
      setTimeout(() => {
        setSearchValue("");
      }, 200),
    onSearch: setSearchValue,
    filterOption: false,
    allowClear,
    showSearch: true,
    dropdownRender: (menu) => (
      <>
        {menu}
        {searchValue && (
          <>
            <Divider className="m-1" />

            <Button
              type="text"
              className="w-full"
              icon={<PlusOutlined />}
              onClick={addItem}
            >
              Add item
            </Button>
          </>
        )}
      </>
    ),
  };

  return (
    <Form.Item
      label={label}
      name={name}
      validateDebounce={1000}
      className="w-full"
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input ${placeholder || label}!`,
        },
      ]}
    >
      <Select {...selectProps} />
    </Form.Item>
  );
}
