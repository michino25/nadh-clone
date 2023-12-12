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

export default function WorkingHistory({ data }: { data: any }) {
  const workingHistory = data
    .filter((item: any) => item.type === 2)
    .map((item: any) => ({
      end_time: item.end_time || "Present",
      start_time: item.start_time,
      position: item.title.label,
      company: item.organization.label,
    }));

  console.log(workingHistory);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <CandidateTable
        editClick={(id: any) => {
          console.log(id);
          setIsEditOpen(true);
        }}
        createBtn={{
          title: "Add Working History",
          handler: () => setIsAddOpen(true),
        }}
        data={workingHistory}
        titleTable="WORKING HISTORY"
        rawColumns={columns}
      />

      <Modal
        title="Add Working History"
        open={isAddOpen}
        closeIcon={null}
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelWorking closeModal={() => setIsAddOpen(false)} />
      </Modal>

      <Modal
        title="Edit Working History"
        open={isEditOpen}
        closeIcon={null}
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelWorking closeModal={() => setIsEditOpen(false)} edit={true} />
      </Modal>
    </>
  );
}
