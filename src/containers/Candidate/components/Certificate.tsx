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

export default function Certificate({
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
  console.log(data);
  const [editId, setEditId] = useState("");

  const certData = data
    ?.filter((item: any) => item.type === 3)
    .map((item: any) => ({
      id: item.id.toString(),
      status: item.status === 1 ? "Is current school" : "",
      end_time: item.end_time?.split("-")[0],
      start_time: item.start_time?.split("-")[0],
      degree: item.title,
      school: item.organization,
    }));

  const certDataTable = certData?.map((item: any) => ({
    ...item,
    degree: item?.degree?.label,
    school: item?.school?.label,
  }));

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
          title: "Add Certificate",
          handler: () => setIsAddOpen(true),
        }}
        data={certDataTable}
        titleTable="CERTIFICATE"
        rawColumns={columns}
      />
      <Modal
        title="Add Certificate"
        open={isAddOpen}
        closeIcon={null}
        destroyOnClose
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelCertificate
          closeModal={() => setIsAddOpen(false)}
          execute={(data) => {
            addFn(data);
            setIsAddOpen(false);
          }}
        />
      </Modal>
      <Modal
        title="Edit Certificate"
        open={isEditOpen}
        closeIcon={null}
        destroyOnClose
        footer={null}
        centered
        maskClosable={false}
      >
        <ModelCertificate
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
          data={certData}
          id={editId}
        />
      </Modal>
    </>
  );
}
