import { RadiusUprightOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { Button, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

const Context = React.createContext({ name: "Default" });

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => openNotification("topRight")}
        icon={<RadiusUprightOutlined />}
      >
        topRight
      </Button>
    </Context.Provider>
  );
};

export default App;
