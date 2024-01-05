import { useMutation, useQuery } from "@tanstack/react-query";
import { iOption, iOption2 } from "_constants/index";
import { Button, Divider, Select, notification } from "antd";
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
  const [searchData, setSearchData] = useState<iOption[]>();

  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useQuery({
    queryKey: ["language", debouncedValue],
    queryFn: async () =>
      await otherApi.getProperty("language", debouncedValue).then((res) => {
        setSearchData(
          res.data.data.map((item: iOption2) => ({
            label: item.label,
            value: item.key + "_" + item.label,
          }))
        );

        return res.data;
      }),
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

  const addItem = () => {
    const value = searchValue;
    createMutation.mutate(value);
  };

  return (
    <>
      <div className="ant-form-item-label">
        <label>{label}</label>
      </div>

      <Select
        mode="multiple"
        placeholder="Select Language"
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
                  className="w-full"
                  icon={<PlusOutlined />}
                  onClick={addItem}
                >
                  Add item
                </Button>
              </>
            )}
          </>
        )}
      />

      <p className="font-semibold my-5 text-base">List of Languages</p>
      <div className="my-5 flex w-full flex-wrap">
        {defaultValue?.map((item, index) => (
          <div
            key={index}
            className="mt-3 pb-3 flex items-baseline w-1/2 md:w-1/3 xl:w-1/5"
          >
            <div>{item.split("_")[1]}</div>
            <DeleteOutlined
              className="hover:text-red-500 cursor-pointer py-1 px-2"
              onClick={() =>
                updateFn(defaultValue.filter((lang) => lang !== item))
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
