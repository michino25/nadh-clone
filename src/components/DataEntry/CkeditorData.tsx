import { Button, Form } from "antd";
import MyCKEditor from "components/DataEntry/MyCKEditor";
import { ReactNode, useEffect, useState } from "react";

export default function CkeditorData({
  label,
  sublabel,
  data,
  updateFn,
  resetSuccess,
  templateBtn,
}: {
  label: string;
  sublabel?: string | ReactNode;
  data?: string;
  updateFn: (value: any, event: () => void) => void;
  resetSuccess?: boolean;
  templateBtn?: { title: string; content: string };
}) {
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNote(data || "");
  }, [data]);

  const addComment = () => {
    setLoading(true);

    updateFn(note, () => {
      setTimeout(() => {
        setEdit(false);
        setLoading(false);
        if (resetSuccess) setNote("");
      }, 500);
    });
  };

  return (
    <>
      <div className="mb-3">
        <Form layout="vertical">
          <Form.Item label={label}>
            {sublabel && <p className="text-gray-500 pb-2">{sublabel}</p>}
            {edit ? (
              <>
                <MyCKEditor value={note} setValue={setNote} />
                <div
                  className={
                    "w-full flex mt-3 " +
                    (templateBtn ? "justify-between" : "justify-end")
                  }
                >
                  {templateBtn && (
                    <Button
                      onClick={() => {
                        setNote(templateBtn.content);
                      }}
                      disabled={loading}
                    >
                      {templateBtn.title}
                    </Button>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setEdit(false);
                        setNote("");
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      onClick={addComment}
                      loading={loading}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <button
                className="cursor-text w-full text-left border-gray-200 border rounded-lg p-3 hover:border-blue-500"
                onClick={() => {
                  setEdit(true);
                  setNote(data || "");
                }}
              >
                {data ? (
                  <div
                    className="StyleInjectInnerHTML"
                    dangerouslySetInnerHTML={{ __html: data }}
                  />
                ) : (
                  <span className="text-gray-400">Add content...</span>
                )}
              </button>
            )}
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
