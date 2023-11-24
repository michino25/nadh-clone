import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatName } from "../../../utils/format";
import { iUserData } from "../../../utils/models";
import { useState } from "react";
import UserInfo from "../Form/UserInfo";

// const api = import.meta.env.VITE_API_URL;

export default function UserInfoDetail({
  open,
  userDetail,
  onClose,
}: {
  open: boolean;
  userDetail: iUserData | undefined;
  onClose: () => void;
}) {
  // const [noti, setNoti] = useState(userDetail);

  // const { refetch } = useQuery({
  //   queryKey: ["UserDetail", userDetail.notify_master_id],
  //   queryFn: () =>
  //     axios
  //       .get(api + `notify_masters/${notiDetail.notify_master_id}`, {
  //         headers: {
  //           Authorization: `Bearer ${getUser()?.token}`,
  //         },
  //       })
  //       .then((res) => setNoti(res.data)),
  // });

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
