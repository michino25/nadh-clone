import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import Navbar from "containers/Navbar/Navbar";
import Navmenu from "containers/Navbar/Navmenu";

export default function MainLayout() {
  return (
    <Flex className="bg-gray-100 min-h-screen" vertical>
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar />
        <Navmenu />
      </div>
      <div className="mt-28">
        <Outlet />
      </div>
    </Flex>
  );
}
