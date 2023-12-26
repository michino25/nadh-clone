import { Avatar, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { formatDate, formatName } from "utils/format";
import MyCKEditor from "components/DataEntry/MyCKEditor";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "apis/index";

const commentItem = (name: string, content: string, date: string) => (
  <div className="p-5 text-base bg-gray-100/50 rounded-lg mb-3">
    <div className="flex gap-4 px-4 mb-2">
      <div>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
          size="small"
        />
      </div>
      <p className="flex-col gap-3">
        <p className="flex gap-2 text-sm mb-3">
          <span className="text-gray-900 font-semibold">{name}</span>
          <span className="text-gray-600">{date}</span>
        </p>
        <p className="text-gray-500 text-sm flex space-y-5">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </p>
    </div>
  </div>
);

export default function Notes({
  data,
  clientID,
  refetch,
  module = "client",
}: any) {
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState("");

  const createNote = async (data: any) => {
    try {
      await clientApi.createComment(data);

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Add Note",
        description: "Add success.",
      });
    } catch (error: any) {
      // error
      // console.error("Add failed", error);
      notification.error({
        message: "Add Note",
        description: `Add failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData: any) => createNote(formData),
  });

  const addComment = () => {
    const data = {
      content: note,
      source: {
        module,
        section: "detail",
      },
      source_uuid: clientID,
    };

    console.log(data);
    createMutation.mutate(data, {
      onSuccess: () => {
        setNote("");
        setEdit(false);
      },
    });
  };

  return (
    <>
      <div className="mb-3">
        {edit ? (
          <>
            {/* <MyCkeditor /> */}
            <MyCKEditor value={note} setValue={setNote} />
            <div className="w-full flex justify-end gap-3 mt-3">
              <Button onClick={() => setEdit(false)}>Cancel</Button>
              <Button type="primary" onClick={addComment}>
                Save
              </Button>
            </div>
          </>
        ) : (
          <button
            className="cursor-text w-full text-left border-gray-200 border rounded-lg p-3 text-gray-400 hover:border-blue-500"
            onClick={() => setEdit(true)}
          >
            Add Comment
          </button>
        )}
      </div>

      <div className="max-h-[400px] overflow-y-scroll">
        {data.length > 0 &&
          data.map((item: any) => (
            <div key={item.createdAt}>
              {commentItem(
                formatName(item.user.full_name) as string,
                item.content,
                formatDate(item.createdAt, "ISOdate", "date&hour") as string
              )}
            </div>
          ))}
      </div>
    </>
  );
}
