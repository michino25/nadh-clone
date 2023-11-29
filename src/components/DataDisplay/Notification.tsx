import { useEffect } from "react";
import { notification } from "antd";

interface iData {
  status: boolean;
  setStatus: (status: boolean) => void;
  notiData: { title: string; content: string } | undefined;
}

const App = ({ status, setStatus, notiData }: iData) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (status && notiData) {
      api.info({
        message: notiData.title,
        description: notiData.content,
      });
      setStatus(false); // Reset status after opening notification
    }
  }, [status, setStatus, api, notiData]);

  return <>{contextHolder}</>;
};

export default App;
