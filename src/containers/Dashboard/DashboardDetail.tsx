import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatName } from "utils/format";
import ClientsList from "containers/Client/components/ClientsList";
import CandidatesList from "containers/Candidate/components/CandidatesList";
import { iUser } from "utils/models";
import JobsList from "containers/Job/components/JobsList";

export default function DashboardDetail({
  open,
  userDetail,
  onClose,
}: {
  open: boolean;
  userDetail: iUser;
  onClose: () => void;
}) {
  return (
    <Drawer
      title={formatName(userDetail.full_name) + "'s Works"}
      placement="bottom"
      width={500}
      closable={false}
      onClose={onClose}
      open={open}
      extra={
        <Button className="flex justify-center items-center" onClick={onClose}>
          <CloseOutlined />
        </Button>
      }
    >
      <div className="flex w-full p-5">
        <CandidatesList userDetail={userDetail} />
      </div>

      <div className="flex w-full p-5">
        <ClientsList userDetail={userDetail} />
      </div>

      <div className="flex w-full p-5">
        <JobsList userDetail={userDetail} />
      </div>
    </Drawer>
  );
}
