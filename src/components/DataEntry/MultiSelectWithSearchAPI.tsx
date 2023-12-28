import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";
import type { SelectProps } from "antd";
import { otherApi } from "apis/index";
import { useState } from "react";

interface iData {
  label: string;
  name: string | string[];
  required: boolean;
  allowClear?: boolean;
  OptGroup?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string[];
  setValue?: (data: string[]) => void;
  propertyName: string;
}

export default function MultiSelectWithSearchAPI({
  label,
  name,
  required,
  defaultValue,
  placeholder,
  allowClear = false,
  OptGroup = false,
  value,
  setValue,
  propertyName,
}: iData) {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState();

  useQuery({
    queryKey: [propertyName, searchValue, OptGroup],
    queryFn: async () =>
      await otherApi
        .getProperty(propertyName, searchValue, OptGroup)
        .then((res) => {
          if (OptGroup)
            setSearchData(
              res.data.data.map((parent: any) => ({
                label: parent.label,
                options: parent.children.map((item: any) => ({
                  label: item.label,
                  value: item.key + "_" + item.label,
                })),
              }))
            );
          else
            setSearchData(
              res.data.data.map((item: any) => ({
                label: item.label,
                value: item.key + "_" + item.label,
              }))
            );
        }),
  });

  const selectProps: SelectProps = {
    mode: "multiple",
    style: { width: "100%" },
    value: value,
    options: searchData,
    onChange: (newValue: string[]) => {
      setValue && setValue(newValue);
    },
    placeholder: placeholder || "Select Item...",
    maxTagCount: "responsive",
    onBlur: () => setSearchValue(""),
    onSearch: setSearchValue,
    filterOption: false,
    allowClear,
  };

  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      className="w-full"
      rules={[
        {
          required: required,
          message: `Please input your your ${label}!`,
        },
      ]}
    >
      <Select {...selectProps} />
    </Form.Item>
  );
}