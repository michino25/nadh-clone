import CandidateTable from "components/DataDisplay/CandidateTable";
import { Modal } from "antd";
import { useState } from "react";
import ModelCertificate from "./ModelCertificate";

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
    title: "Degree",
    key: "degree",
  },
];

export default function Certificate({ data }: { data: any }) {
  console.log(data);

  const certData = data
    .filter((item: any) => item.type === 3)
    .map((item: any) => ({
      status: item.status === 1 ? "Is current school" : "",
      end_time: item.end_time?.split("-")[0],
      start_time: item.start_time?.split("-")[0],
      degree: item.title?.label,
      school: item.organization?.label,
    }));

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
          title: "Add Certificate",
          handler: () => setIsAddOpen(true),
        }}
        data={certData}
        titleTable="CERTIFICATE"
        rawColumns={columns}
      />
      <Modal
        title="Add Certificate"
        open={isAddOpen}
        closeIcon={null}
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelCertificate closeModal={() => setIsAddOpen(false)} />
      </Modal>
      <Modal
        title="Edit Certificate"
        open={isEditOpen}
        closeIcon={null}
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelCertificate closeModal={() => setIsEditOpen(false)} edit={true} />
      </Modal>
    </>
  );
}
