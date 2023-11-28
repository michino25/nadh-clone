import { Input, Popover, Flex, Dropdown, Button, Empty } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser";
import { iUserData } from "../../utils/models";
import {
  BellOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import UserInfoDetail from "./Detail/UserInfoDetail";

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

  const logoutHandler = () => {
    localStorage.setItem("userData", "");
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Button
          className="h-auto w-full text-left hover:bg-transparent border-0 p-0"
          onClick={showDrawer}
          type="link"
        >
          User Information
        </Button>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button
          className="h-auto w-full text-left hover:bg-transparent border-0 p-0"
          onClick={logoutHandler}
          type="link"
        >
          Logout
        </Button>
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
    <button
      onClick={() => setSearchShow(false)}
      className="hover:text-blue-500"
    >
      <CloseCircleOutlined />
    </button>
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
            <button
              onClick={() => setSearchShow(true)}
              tabIndex={-1}
              className="anticon anticon-search pointer"
              style={{ fontSize: "20px" }}
            >
              <SearchOutlined />
            </button>
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
            <button
              tabIndex={-1}
              className="anticon anticon-bell pointer mx-3"
              style={{ fontSize: "20px", marginBottom: "2px" }}
            >
              <BellOutlined />
            </button>
          </Popover>

          {/* User */}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              className="text-white hover:text-gray-200"
            >
              <Flex align="center" gap="small">
                <Flex align="center" vertical>
                  <p className="uppercase font-bold whitespace-nowrap">
                    {user?.user_sent.full_name}
                  </p>
                  <p className="mb-0 text-right whitespace-nowrap">
                    <span>{user?.user_sent.user_name} - </span>
                    <span className="ml-1">{user?.user_sent.role.name}</span>
                  </p>
                </Flex>

                <Flex
                  align="center"
                  justify="center"
                  className="mt-1 ml-2 rounded-full bg-slate-400/70 w-8 h-8"
                >
                  <i aria-label="icon: user" className="anticon anticon-user">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      className=""
                      data-icon="user"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                    </svg>
                  </i>
                </Flex>
              </Flex>
            </a>
          </Dropdown>
        </div>
      </div>

      {open && <UserInfoDetail open={open} onClose={onClose} />}
    </>
  );
}
