import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatName } from "../../../utils/format";
import UserInfo from "./UserInfo";

export default function UserInfoDetail({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      title={formatName("User Information")}
      placement="right"
      width={950}
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
        <UserInfo />
      </div>
    </Drawer>
  );
}
