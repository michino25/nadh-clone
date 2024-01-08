import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface iUpload {
  onChange: (id: string) => void;
  data: {
    type: string;
    uploadedByUserId: number;
  };
  img: string;
  editing: boolean;
}

export const MyAvatar = ({ data, onChange, img, editing }: iUpload) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(img);

  const handleChange = ({ file }: { file: UploadFile }) => {
    if (file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (file.status === "done") {
      // Get this url from response in real world.
      getBase64(file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }

    if (file.status === "error") {
      console.error("Upload error");
    } else {
      console.log(file.response?.id);
      onChange(file.response?.id);
    }
  };

  const uploadButton = (
    <div className="w-full">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      data={data}
      name="avatar"
      disabled={editing}
      listType="picture-card"
      showUploadList={false}
      action="https://lubrytics.com:8443/nadh-mediafile/file"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      className="my-avt"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
