import { useMutation, useQuery } from "@tanstack/react-query";
import { Divider, Form, Select, Button, notification } from "antd";
import type { SelectProps } from "antd";
import { otherApi } from "apis/index";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { iOption2 } from "_constants/index";

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

  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const { data: searchData } = useQuery({
    queryKey: [propertyName, debouncedValue],
    queryFn: async () =>
      await otherApi.getProperty(propertyName, debouncedValue),
    select: (res) => {
      return res.data.data.map((item: iOption2) => ({
        label: item.label,
        value: item.key + "_" + item.label,
      }));
    },
  });

  const addProperty = async (data: any) => {
    try {
      await otherApi.addProperty(propertyName, data);

      // success
      notification.success({
        message: "Add " + label,
        description: "Add success.",
      });
    } catch (error: unknown) {
      // error
      if (error instanceof AxiosError)
        notification.error({
          message: "Add " + label,
          description: `Add failed. ${
            error.response?.data[0].message || "Please try again."
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
    placeholder: placeholder || `Select ${label}...`,
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
              className="w-full text-left px-2"
              icon={<PlusOutlined />}
              onClick={addItem}
            >
              Add {label.toLowerCase()}
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
