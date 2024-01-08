import { useQuery } from "@tanstack/react-query";
import { iOption2 } from "_constants/index";
import { Form, Select } from "antd";
import type { SelectProps } from "antd";
import { otherApi } from "apis/index";
import { useEffect, useState } from "react";

interface iData {
  label: string;
  name: string | string[];
  required: boolean;
  allowClear?: boolean;
  OptGroup?: boolean;
  placeholder?: string;
  defaultValue?: string[];
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

  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const { data: searchData } = useQuery({
    queryKey: [propertyName, debouncedValue, OptGroup],
    queryFn: async () =>
      await otherApi.getProperty(propertyName, debouncedValue, OptGroup),
    select: (res) => {
      if (OptGroup)
        return res.data.data.map(
          (parent: { label: string; children: iOption2[] }) => ({
            label: parent.label,
            options: parent.children.map((item: iOption2) => ({
              label: item.label,
              value: item.key + "_" + item.label,
            })),
          })
        );
      else
        return res.data.data.map((item: iOption2) => ({
          label: item.label,
          value: item.key + "_" + item.label,
        }));
    },
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
