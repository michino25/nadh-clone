import { Avatar, Dropdown } from "antd";
import { UserOutlined, MoreOutlined } from "@ant-design/icons";

export default function CommentItem({
  name,
  content,
  date,
  optionTitle,
  optionFn,
  avtLink,
}: {
  name: string;
  content: string;
  date: string;
  optionTitle?: string;
  optionFn?: () => void;
  avtLink?: string;
}) {
  return (
    <div className="p-5 text-base bg-gray-100/50 rounded-lg mb-3">
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <div>
            {avtLink ? (
              <Avatar src={avtLink} size="small" />
            ) : (
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
                size="small"
              />
            )}
          </div>
          <p className="flex-col gap-2">
            <p className="flex text-sm mb-1 gap-1 flex-wrap">
              <span className="text-gray-900 font-semibold">{name}</span>
              <span className="text-gray-600">{date}</span>
            </p>
            <p className="text-gray-500 text-sm flex space-y-5">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </p>
          </p>
        </div>
        {optionFn && optionTitle && (
          <div>
            <Dropdown
              menu={{
                items: [
                  {
                    label: <button onClick={optionFn}>{optionTitle}</button>,
                    key: "0",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <MoreOutlined
                className="hover:bg-gray-400/10 rounded-lg p-2"
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}
