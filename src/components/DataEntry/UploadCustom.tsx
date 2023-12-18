import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function UploadCustom(props: any) {
  const {
    onChange,
    value,
    dirPath,
    listType,
    multiple,
    accept,
    limit,
    className,
    width,
    height,
  } = props;
  const [uploadData, setUploadData] = useState<any>({});
  let flag = false;

  const init = async () => {
    setUploadData({});
  };

  useEffect(() => {
    init();
  }, [dirPath]);

  const handleChange = ({ file, fileList }: any) => {
    if (file.status === "error") {
      message.error("上传出错！");
    }
    if (onChange) {
      onChange(
        fileList.filter(
          (v: any) => v.status === "done" || v.status === "uploading"
        )
      );
    }
  };

  const onRemove = (file: any) => {
    const files = value.filter((v: any) => v.url !== file.url);
    if (onChange) {
      onChange(files);
    }
  };

  const transformFile = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = `${dayjs().format("YYYY-MM-DD")}${Date.now()}${suffix}`;
    file.url = `${dirPath}${filename}`;
    return file;
  };

  const getExtraData = (file: any) => {
    return {
      key: file.url,
      success_action_status: 200,
      policy: uploadData.policy,
      Signature: uploadData.signature,
    };
  };

  const checkSize = (file: any) => {
    return new Promise((resolve, reject) => {
      const url = window.URL || window.webkitURL;
      const img = new Image();
      img.onload = () => {
        const valid =
          img.width >= width &&
          img.height >= height &&
          img.width / img.height === width / height;
        valid ? resolve(value) : reject();
      };
      img.src = url.createObjectURL(file);
    }).then(
      () => {
        return true;
      },
      () => {
        if (flag) {
          Modal.error({
            title: `图片尺寸不符合要求，请修改后重新上传！`,
          });
          flag = false;
        }
        return Promise.reject();
      }
    );
  };

  const checkLen = (fileList: any[]) => {
    return new Promise((resolve, reject) => {
      const isLen = value.length + fileList.length;
      isLen <= limit ? resolve(value) : reject();
    }).then(
      () => {
        return true;
      },
      () => {
        if (flag) {
          Modal.error({
            title: `超过最大上传数量${limit}张，请重新选择！`,
          });
          flag = false;
        }
        return Promise.reject();
      }
    );
  };

  const beforeUpload = async (file: any, fileList: any[]) => {
    flag = true;
    const isLen = limit ? await checkLen(fileList) : true;
    const isSize = width ? await checkSize(file) : true;
    const expire = uploadData.expire * 1000;
    if (expire < Date.now()) {
      await init();
    }
    return isLen && isSize;
  };

  const handlePreview = async (file: any) => {
    let src = file.url;
    if (!src || src.indexOf("http") === -1) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadProps = {
    name: "file",
    fileList: value,
    action: uploadData.host,
    data: getExtraData,
    onChange: handleChange,
    onPreview: handlePreview,
    onRemove,
    transformFile,
    beforeUpload,
    listType,
    multiple,
    accept,
    className,
  };

  const Con = () =>
    listType ? (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    ) : (
      <Button>
        <UploadOutlined /> 上传
      </Button>
    );

  return (
    <Upload {...uploadProps}>{value && value.length < limit && Con()}</Upload>
  );
}
