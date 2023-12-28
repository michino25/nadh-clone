import { Button, notification } from "antd";
import { formatDate, formatName } from "utils/format";
import MyCKEditor from "components/DataEntry/MyCKEditor";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { otherApi } from "apis/index";
import CommentItem from "components/ShareComponents/CommentItem";

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
      await otherApi.createComment(data);

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
              <CommentItem
                name={formatName(item.user.full_name) as string}
                content={item.content}
                date={
                  formatDate(item.createdAt, "ISOdate", "date&hour") as string
                }
                avtLink={
                  item.user.mediafiles.avatar &&
                  "https://lubrytics.com:8443/nadh-mediafile/file/" +
                    item.user.mediafiles.avatar
                }
              />
            </div>
          ))}
      </div>
    </>
  );
}
