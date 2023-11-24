import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  HomeOutlined,
  SolutionOutlined,
  TeamOutlined,
  ScheduleOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: <Link to={"/dashboard"}>Dashboard</Link>,
    key: "/dashboard",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={"/candidates"}>Candidates</Link>,
    key: "/candidates",
    icon: <SolutionOutlined />,
  },
  {
    label: <Link to={"/clients"}>Clients</Link>,
    key: "/clients",
    icon: <TeamOutlined />,
  },
  {
    label: <Link to={"/jobs"}>Jobs</Link>,
    key: "/jobs",
    icon: <ScheduleOutlined />,
  },
  {
    label: <Link to={"/users"}>Users</Link>,
    key: "/users",
    icon: <UserOutlined />,
  },
  {
    label: <Link to={"/notify"}>Notify</Link>,
    key: "/notify",
    icon: <BellOutlined />,
  },
  {
    label: <Link to={"/group-user"}>GroupUser</Link>,
    key: "/group-user",
    icon: <UserOutlined />,
  },
];

const Navmenu = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      className="select-none"
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Navmenu;