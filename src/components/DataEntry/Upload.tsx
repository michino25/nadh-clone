import { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Upload, Form, Descriptions } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload";

interface iCustomUploadFile extends UploadFile {
  created_at?: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const normFile = (e: { fileList: UploadFile[] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface iUpload {
  label: string;
  onChange: (id: string) => void;
  onDelete: (uid: string) => void;
  data: {
    obj_table: string;
    obj_uid: string;
    uploadedByUserId: number;
  };
  imgList: UploadFile[];
  loading: boolean;
}

export default function DataUpload({
  label,
  onChange,
  onDelete,
  data: dataParam,
  imgList,
  loading,
}: iUpload) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewCreateAt, setPreviewCreateAt] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>(imgList);

  const [uploading, setUploading] = useState(false);

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

  const handlePreview = async (file: iCustomUploadFile) => {
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

  const getBlob = (url: string, cb: (blob: Blob) => void) => {
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

  const saveAs = (blob: Blob | MediaSource, filename: string) => {
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

  const handleDownload = (file: UploadFile) => {
    getBlob(file.url as string, function (blob: Blob | MediaSource) {
      saveAs(blob, file.name);
    });
  };

  const handleChange = ({
    file,
    fileList,
  }: {
    file: UploadFile;
    fileList: UploadFile[];
  }) => {
    if (file.status === "uploading") setUploading(true);

    if (file.status === "error") {
      console.error("Upload error");
    } else {
      setFileList(fileList);
      if (file.status === "done") setUploading(false);
      onChange(file.response?.id);
    }
  };

  const handleDelete = (file: { uid: string }) => {
    console.log(file.uid);
    onDelete(file.uid);
  };

  const uploadButton = (
    <div>
      {loading || uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const infoImg = (
    <Descriptions column={1}>
      <Descriptions.Item label="Name">{previewTitle}</Descriptions.Item>
      <Descriptions.Item label="Upload at">{previewCreateAt}</Descriptions.Item>
    </Descriptions>
  );

  return (
    <>
      <Form.Item
        label={label}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action="https://lubrytics.com:8443/nadh-mediafile/file"
          data={dataParam}
          listType="picture-card"
          fileList={fileList}
          showUploadList={{ showDownloadIcon: true }}
          onDownload={handleDownload}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleDelete}
          multiple
          disabled={loading || uploading}
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
