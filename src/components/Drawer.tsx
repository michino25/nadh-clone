import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatName } from "../../utils/format";
import ClientsList from "./Table/ClientsList";
import CandidatesList from "./Table/CandidatesList";
import { iUser } from "../../utils/models";

export default function DataDrawer({
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
      title={formatName(userDetail.full_name)}
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
    </Drawer>
  );
}
