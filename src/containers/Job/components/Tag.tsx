import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Input, Space, Tag as TagAnt, Tooltip, notification } from "antd";
import { Link } from "react-router-dom";

export default function Tag({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (value: string[]) => void;
}) {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag: string) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  function isValidUrl(string: string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  const handleInputConfirm = () => {
    if (!isValidUrl(inputValue))
      notification.error({
        message: "Add Display On",
        description: "Text must be URL. Please try again.",
      });
    else if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    borderStyle: "dashed",
  };

  return (
    <Space size={[0, 8]} wrap>
      {tags.map((tag: string) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <TagAnt
            key={tag}
            closable={true}
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
          </TagAnt>
        );
        const linkTag = (
          <Link target="_blank" to={tag}>
            {tag}
          </Link>
        );
        return isLongTag ? (
          <Tooltip title={linkTag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          placeholder="URL"
          style={tagInputStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <TagAnt
          style={tagPlusStyle}
          icon={<PlusOutlined />}
          onClick={showInput}
          className="cursor-pointer"
        >
          New Tag
        </TagAnt>
      )}
    </Space>
  );
}
