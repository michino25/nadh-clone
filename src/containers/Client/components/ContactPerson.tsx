import { Modal } from "antd";
import ContactPersonModel from "./ContactPersonModel";
import CandidateTable from "components/DataDisplay/CandidateTable";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Current Contact",
    dataIndex: "current",
    key: "current",
    render: (_: any, { current }: any) => (
      <span className="w-2/3 block text-center">
        {current === "true" ? <CheckOutlined /> : ""}
      </span>
    ),
  },
  {
    title: "Mobile",
    dataIndex: "mobile_phone",
    key: "mobile_phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Job(s)",
    dataIndex: "jobs_count",
    key: "jobs_count",
  },
];

export default function ContactPerson({
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
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState("");

  return (
    <>
      <CandidateTable
        editClick={(id: any) => {
          setEditId(id);
          setIsEditOpen(true);
        }}
        createBtn={{
          title: "New Contact",
          handler: () => setIsAddOpen(true),
        }}
        data={data}
        titleTable=""
        rawColumns={columns}
      />

      <Modal
        title="Add Contact Person"
        open={isAddOpen}
        closeIcon={null}
        footer={null}
        destroyOnClose
        centered
        maskClosable={false}
      >
        <ContactPersonModel
          closeModal={() => setIsAddOpen(false)}
          execute={(data) => {
            addFn(data);
            setIsAddOpen(false);
          }}
        />
      </Modal>

      <Modal
        title="Edit Contact Person"
        open={isEditOpen}
        closeIcon={null}
        footer={null}
        destroyOnClose
        centered
        maskClosable={false}
      >
        <ContactPersonModel
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
          id={editId}
        />
      </Modal>
    </>
  );
}
