import { useMutation, useQuery } from "@tanstack/react-query";
import { iOption, iOption2 } from "_constants/index";
import { Modal, Button, Divider, Select, notification } from "antd";
import { otherApi } from "apis/index";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

interface iData {
  label: string;
  allowClear?: boolean;
  defaultValue?: string[];
  updateFn: (data: string[]) => void;
}

export default function SelectLanguage({
  label,
  defaultValue,
  allowClear = false,
  updateFn,
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
    queryKey: ["language", debouncedValue],
    queryFn: async () => await otherApi.getProperty("language", debouncedValue),
    select: (res) => {
      return res.data.data.map((item: iOption2) => ({
        label: item.label,
        value: item.key + "_" + item.label,
      }));
    },
  });

  const addProperty = async (data: string) => {
    try {
      await otherApi.addProperty("language", data);

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

  const showConfirmSubmit = (value: string) => {
    Modal.confirm({
      title: "Confirm to create language",
      content: `Do you want to create '${value}' as new language ?`,
      onOk: () => createMutation.mutate(value),
    });
  };

  const addItem = () => {
    const value = searchValue;
    showConfirmSubmit(value);
  };

  return (
    <>
      <div className="ant-form-item-label">
        <label>{label}</label>
      </div>

      <Select
        mode="multiple"
        placeholder="Select or add your languages"
        value={[]}
        onChange={(value) =>
          updateFn([
            ...value,
            ...(Array.isArray(defaultValue) ? defaultValue : []),
          ])
        }
        style={{ width: "100%" }}
        options={searchData?.map((item: iOption) =>
          defaultValue?.includes(item.value as string)
            ? { ...item, disabled: true }
            : item
        )}
        onSearch={setSearchValue}
        onBlur={() =>
          setTimeout(() => {
            setSearchValue("");
          }, 200)
        }
        filterOption={false}
        allowClear={allowClear}
        dropdownRender={(menu) => (
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
                  Add language
                </Button>
              </>
            )}
          </>
        )}
      />

      <p className="font-semibold px-5 mt-5 text-sm">List of Languages</p>
      <div className="mb-5 mt-2 px-5 flex w-full flex-wrap">
        {defaultValue?.map((item, index) => (
          <p key={index} className="my-1 flex items-center w-1/2">
            {item.split("_")[1]}
            <DeleteOutlined
              className="text-red-500 cursor-pointer mx-2 text-base"
              onClick={() =>
                updateFn(defaultValue.filter((lang) => lang !== item))
              }
            />
          </p>
        ))}
      </div>
    </>
  );
}
