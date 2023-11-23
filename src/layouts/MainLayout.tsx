import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import Navbar from "../components/Navbar";
import Navmenu from "../components/Navmenu";

export default function MainLayout() {
  return (
    <Flex className="bg-gray-100 min-h-screen" vertical>
      <Navbar />
      <Navmenu />
      <Outlet />
    </Flex>
  );
}
