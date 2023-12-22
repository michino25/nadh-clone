import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Form, Descriptions } from "antd";
import type { RcFile } from "antd/es/upload";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function DataUpload({
  label,
  onChange,
  onDelete,
  data,
  imgList,
}: any) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewCreateAt, setPreviewCreateAt] = useState("");

  const [fileList, setFileList] = useState<any[]>(imgList);

  useEffect(() => {
    setFileList(imgList);
  }, [imgList]);

  // [
  //   {
  //     uid: "-1",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  // ];

  // console.log(imgList);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    setPreviewCreateAt(file.created_at || "");
  };

  const getBlob = (url: string, cb: any) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status === 200) {
        cb(xhr.response);
      }
    };
    xhr.send();
  };

  const saveAs = (blob: any, filename: string) => {
    const link = document.createElement("a");
    const body = document.querySelector("body");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    // fix Firefox
    link.style.display = "none";
    body!.appendChild(link);
    link.click();
    body!.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const handleDownload = (file: any) => {
    getBlob(file.url, function (blob: any) {
      saveAs(blob, file.name);
    });
  };

  const handleChange = ({ file, fileList }: any) => {
    if (file.status === "error") {
      console.error("Upload error");
    } else {
      console.log(file.response?.id);
      onChange(file.response?.id);

      setFileList(fileList);
    }
  };

  const handleDelete = (file: any) => {
    console.log(file.uid);
    onDelete(file.uid);
  };

  // const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
  //   setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const infoImg = (
    <Descriptions column={1}>
      <Descriptions.Item label="Name">{previewTitle}</Descriptions.Item>
      <Descriptions.Item label="Upload at">{previewCreateAt}</Descriptions.Item>
    </Descriptions>
  );

  console.log(data);

  return (
    <>
      <Form.Item
        label={label}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action="https://lubrytics.com:8443/nadh-mediafile/file"
          data={data}
          listType="picture-card"
          fileList={fileList}
          showUploadList={{ showDownloadIcon: true }}
          onDownload={handleDownload}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleDelete}
        >
          {uploadButton}
        </Upload>
      </Form.Item>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={infoImg}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
