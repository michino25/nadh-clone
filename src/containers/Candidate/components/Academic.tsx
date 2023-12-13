import CandidateTable from "components/DataDisplay/CandidateTable";
import { Modal } from "antd";
import { useState } from "react";
import ModelAcademic from "./ModelAcademic";

const columns = [
  {
    title: "Current School",
    key: "status",
  },
  {
    title: "Start Year",
    key: "start_time",
  },
  {
    title: "Graduation Year",
    key: "end_time",
  },
  {
    title: "School",
    key: "school",
  },
  {
    title: "Major",
    key: "major",
  },
  {
    title: "Degree",
    key: "degree",
  },
];

export default function Academic({
  data,
  addFn,
  updateFn,
  deleteFn,
}: {
  data: any;
  addFn: (data: any) => void;
  updateFn: (data: any, id: string) => void;
  deleteFn: (data: any) => void;
}) {
  const [editId, setEditId] = useState("");
  const eduData = data
    .filter((item: any) => item.type === 1)
    .map((item: any) => ({
      id: item.id.toString(),
      status: item.status === 1 ? "Is current school" : "",
      end_time: item.end_time?.split("-")[0],
      start_time: item.start_time?.split("-")[0],
      major: item.title,
      school: item.organization,
      degree: item.degree,
    }));

  const eduDataTable = eduData.map((item: any) => ({
    ...item,
    major: item?.major?.label,
    school: item?.school?.label,
    degree: item?.degree?.label,
  }));

  console.log(eduData);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <CandidateTable
        editClick={(id: any) => {
          setEditId(id);
          setIsEditOpen(true);
        }}
        createBtn={{
          title: "Add Education",
          handler: () => setIsAddOpen(true),
        }}
        data={eduDataTable}
        titleTable="ACADEMIC"
        rawColumns={columns}
      />

      <Modal
        title="Add Education"
        open={isAddOpen}
        closeIcon={null}
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelAcademic
          closeModal={() => setIsAddOpen(false)}
          execute={(data) => {
            addFn(data);
            setIsAddOpen(false);
          }}
        />
      </Modal>

      <Modal
        title="Edit Education"
        open={isEditOpen}
        closeIcon={null}
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelAcademic
          closeModal={() => setIsEditOpen(false)}
          edit={true}
          execute={(data, id) => {
            updateFn(data, id as string);
            setIsEditOpen(false);
          }}
          onDelete={(id) => {
            deleteFn(id);
            setIsEditOpen(false);
          }}
          data={eduData}
          id={editId}
        />
      </Modal>
    </>
  );
}
