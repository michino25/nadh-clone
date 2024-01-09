import { Input, Popover, Flex, Dropdown, Empty, Modal, Avatar } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "utils/getUser";
import { iUserData } from "utils/models";

import {
  BellOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserInfoDetail from "containers/Navbar/components/UserInfoDetail";
import { userApi } from "apis/index";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<iUserData>();
  const [searchShow, setSearchShow] = useState(false);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showConfirmLogout = () => {
    Modal.confirm({
      title: "Confirm to logout",
      content: "Are you sure you want to log out?",
      onOk: () => logoutHandler(),
    });
  };

  const logoutHandler = async () => {
    localStorage.setItem("userData", "");
    await userApi.logout();
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <button
          className="h-full w-full text-left hover:bg-transparent border-0 p-0"
          onClick={showDrawer}
        >
          User Information
        </button>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="h-full w-full text-left hover:bg-transparent border-0 p-0"
          onClick={showConfirmLogout}
        >
          Logout
        </button>
      ),
      key: "1",
    },
  ];

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    } else navigate("/login");
  }, []);

  const suffix = (
    <CloseCircleOutlined
      onClick={() => setSearchShow(false)}
      className="hover:text-blue-500"
    />
  );

  return (
    <>
      <div
        className="flex justify-between py-2 px-8 select-none"
        style={{
          background: "linear-gradient(98deg, #4286f4, #00ce7f 60%)",
        }}
      >
        <Flex align="center" justify="center">
          <img
            src="https://nadh.lubrytics.com/static/media/logo_white.0fe5940b.png"
            width="90"
            style={{ objectFit: "cover" }}
          />
        </Flex>

        <div className="flex items-center justify-end gap-2 text-white relative">
          {/* Search icon */}
          {!searchShow ? (
            <SearchOutlined
              onClick={() => setSearchShow(true)}
              className="pointer text-xl"
            />
          ) : (
            <Input.Search
              placeholder="Search..."
              onSearch={() => {}}
              suffix={suffix}
              enterButton
            />
          )}

          {/* Noti icon */}
          <Popover content={<Empty />} title="Notification">
            <BellOutlined className="pointer mx-3 text-xl" />
          </Popover>

          {/* User */}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              className="text-white hover:text-gray-200"
            >
              <Flex align="center" gap="middle">
                <Flex align="center" vertical className="text-sm">
                  <p className="uppercase font-bold whitespace-nowrap">
                    {user?.user_sent.full_name}
                  </p>
                  <p className="mb-0 text-right whitespace-nowrap">
                    <span>{user?.user_sent.user_name} - </span>
                    <span className="ml-1">{user?.user_sent.role.name}</span>
                  </p>
                </Flex>

                {user?.user_sent.avatar ? (
                  <Avatar
                    src={
                      "https://lubrytics.com:8443/nadh-mediafile/file/" +
                      user?.user_sent.avatar
                    }
                  />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )}
              </Flex>
            </a>
          </Dropdown>
        </div>
      </div>

      {open && <UserInfoDetail open={open} onClose={onClose} />}
    </>
  );
}
