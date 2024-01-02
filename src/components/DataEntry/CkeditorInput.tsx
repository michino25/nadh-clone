import { Button, Form } from "antd";
import MyCKEditor from "components/DataEntry/MyCKEditor";
import { useEffect, useState } from "react";

interface iDataInput {
  label?: string;
  value: string;
  defaultValue: string;
  setValue: (value: string) => void;
}

export default function CkeditorInput({
  label,
  value,
  setValue,
  defaultValue,
}: iDataInput) {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <Form.Item className="mb-5" label={label}>
      {edit ? (
        <>
          <MyCKEditor value={value} setValue={setValue} />

          <div className="w-full flex justify-end gap-3 mt-2">
            <Button
              onClick={() => {
                setEdit(false);
                setValue(defaultValue);
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <button
          className="cursor-text w-full text-left border-gray-200 border rounded-lg p-3 hover:border-blue-500"
          onClick={() => {
            setEdit(true);
            setValue(value);
          }}
        >
          {value ? (
            <div
              className="StyleInjectInnerHTML"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <span className="text-gray-400">Add content...</span>
          )}
        </button>
      )}
    </Form.Item>
  );
}
