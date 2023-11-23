import { Flex, Dropdown } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: <Link to={"#"}>User Information</Link>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: <Link to={"/login"}>Logout</Link>,
    key: "1",
  },
];

export default function Navbar() {
  return (
    <Flex
      justify="space-between"
      style={{
        background: "linear-gradient(98deg, #4286f4, #00ce7f 60%)",
        padding: "8px",
        paddingLeft: "32px",
        paddingRight: "32px",
      }}
    >
      <Flex align="center" justify="center">
        <img
          src="https://nadh.lubrytics.com/static/media/logo_white.0fe5940b.png"
          width="90"
          style={{ objectFit: "cover" }}
        />
      </Flex>

      <Flex
        align="center"
        gap="middle"
        style={{ color: "white", position: "relative" }}
      >
        {/* Search icon */}
        <i
          aria-label="icon: search"
          tabIndex={-1}
          className="anticon anticon-search pointer"
          style={{ fontSize: "20px" }}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            className=""
            data-icon="search"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </i>

        {/* Noti icon */}
        <i
          aria-label="icon: bell"
          tabIndex={-1}
          className="anticon anticon-bell pointer mx-3"
          style={{ fontSize: "20px", marginBottom: "2px" }}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            className=""
            data-icon="bell"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"></path>
          </svg>
        </i>

        {/* User */}
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a
            onClick={(e) => e.preventDefault()}
            className="text-white hover:text-gray-200"
          >
            <Flex align="center" gap="small">
              <Flex align="center" vertical>
                <p className="uppercase font-bold">thanh binh</p>
                <p className="mb-0 text-right">
                  <span>thanhbinh - </span>
                  <span className="ml-1">Manager</span>
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
      </Flex>
    </Flex>
  );
}
