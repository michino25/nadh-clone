import CandidateTable from "components/DataDisplay/CandidateTable";
import { Modal } from "antd";
import { useState } from "react";
import ModelWorking from "./ModelWorking";

const columns = [
  {
    title: "Company",
    key: "company",
  },
  {
    title: "Position",
    key: "position",
  },
  {
    title: "Start Time",
    key: "start_time",
  },
  {
    title: "End Time",
    key: "end_time",
  },
];

export default function WorkingHistory({
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

  const workingHistory = data
    .filter((item: any) => item.type === 2)
    .map((item: any) => ({
      id: item.id.toString(),
      end_time: item.end_time || "Present",
      start_time: item.start_time,
      position: item.title,
      company: item.organization,
    }));

  const workingHistoryTable = workingHistory.map((item: any) => ({
    ...item,
    position: item?.position?.label,
    company: item?.company?.label,
  }));

  console.log(workingHistory);

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
          title: "Add Working History",
          handler: () => setIsAddOpen(true),
        }}
        data={workingHistoryTable}
        titleTable="WORKING HISTORY"
        rawColumns={columns}
      />

      <Modal
        title="Add Working History"
        open={isAddOpen}
        closeIcon={null}
        footer={null}
        destroyOnClose
        centered
        maskClosable={false}
      >
        <ModelWorking
          closeModal={() => setIsAddOpen(false)}
          execute={(data) => {
            addFn(data);
            setIsAddOpen(false);
          }}
        />
      </Modal>

      <Modal
        title="Edit Working History"
        open={isEditOpen}
        closeIcon={null}
        footer={null}
        destroyOnClose
        centered
        maskClosable={false}
      >
        <ModelWorking
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
          data={workingHistory}
          id={editId}
        />
      </Modal>
    </>
  );
}
