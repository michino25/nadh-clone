import { useState } from "react";
import { Select, Form } from "antd";

interface iData {
  label: string;
  name: string;
  required?: boolean;
  firstData: string[];
  secondData: Record<string, string[]>;
  thirdData: Record<string, string[]>;
}

export default function CoordinateSelect({
  label,
  name,
  required,
  firstData,
  secondData,
  thirdData,
}: iData) {
  type FirstName = (typeof firstData)[number];
  type SecondName = (typeof secondData)[FirstName][number];
  type ThirdName = (typeof thirdData)[SecondName][number];

  const [selectedFirst, setSelectedFirst] = useState<FirstName>(firstData[0]);
  const [selectedSecond, setSelectedSecond] = useState<SecondName>(
    secondData[selectedFirst][0]
  );
  const [selectedThird, setSelectedThird] = useState<ThirdName>(
    thirdData[selectedSecond][0]
  );

  const handleFirstChange = (value: FirstName) => {
    setSelectedFirst(value);
    setSelectedSecond(secondData[value][0]);
    setSelectedThird(thirdData[secondData[value][0]][0]);
  };

  const handleSecondChange = (value: SecondName) => {
    setSelectedSecond(value);
    setSelectedThird(thirdData[value][0]);
  };

  const handleThirdChange = (value: ThirdName) => {
    setSelectedThird(value);
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: `Please input your your ${label}!`,
        },
      ]}
    >
      <div className="w-full flex space-x-2">
        <Select
          className="w-1/3"
          value={selectedFirst}
          onChange={handleFirstChange}
          options={firstData.map((first) => ({ label: first, value: first }))}
        />
        <Select
          className="w-1/3"
          value={selectedSecond}
          onChange={handleSecondChange}
          options={secondData[selectedFirst].map((second) => ({
            label: second,
            value: second,
          }))}
        />
        <Select
          className="w-1/3"
          value={selectedThird}
          onChange={handleThirdChange}
          options={thirdData[selectedSecond].map((third) => ({
            label: third,
            value: third,
          }))}
        />
      </div>
    </Form.Item>
  );
}
