import React, { useCallback, useEffect } from "react";
import { Modal } from "antd";

interface ConfirmModalProps {
  onConfirm: () => void;
  modalType: "confirm" | "warning" | "info" | "error";
  status: boolean;
  setStatus: (status: boolean) => void;
  modalData: { title: string; content: string } | undefined;
}

const App: React.FC<ConfirmModalProps> = ({
  onConfirm,
  modalType,
  status,
  setStatus,
  modalData,
}) => {
  const [modal, contextHolder] = Modal.useModal();

  const handleOk = useCallback(() => {
    onConfirm();
    setStatus(false);
  }, [onConfirm, setStatus]);

  const handleCancel = useCallback(() => {
    setStatus(false);
  }, [setStatus]);

  useEffect(() => {
    if (status && modalData) {
      modal[modalType]({
        ...modalData,
        onOk: handleOk,
        onCancel: handleCancel,
      });
    } else {
      // console.log("fail", modalData, status);
    }
  }, [status, handleOk, handleCancel, modal, modalType, modalData]);

  return <>{contextHolder}</>;
};
export default App;
