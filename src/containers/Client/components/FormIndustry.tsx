import { Button, Form } from "antd";
import { useState } from "react";
import type { iOption } from "_constants/index";
import IndustryTable from "components/DataDisplay/IndustryTable";
import { v4 as uuidv4 } from "uuid";
import Industry from "components/DataEntry/Industry";

interface iDataInput {
  value: any;
  setValue: (value: any) => void;
}

const App = ({ value, setValue }: iDataInput) => {
  const [industry, setIndustry] = useState<iOption>();
  const [sector, setSector] = useState<iOption>();
  const [category, setCategory] = useState<iOption>();

  const saveData = () => {
    setValue([
      ...value,
      {
        id: uuidv4(),
        industry,
        sector,
        category,
      },
    ]);
  };

  // console.log(value);

  const deleteItem = (id: string) => {
    setValue(value.filter((item: any) => item.id !== id));
  };

  return (
    <>
      <Form.Item label="Industry" className="mb-0">
        <div className="flex-col w-full justify-between items-center">
          <div className="flex w-full space-x-3">
            <Industry
              industry={industry}
              setIndustry={setIndustry}
              sector={sector}
              setSector={setSector}
              category={category}
              setCategory={setCategory}
            />
          </div>

          <div className="flex justify-end pb-4">
            <Button disabled={!industry} onClick={saveData} type="primary">
              Save Industry
            </Button>
          </div>
        </div>
      </Form.Item>
      {value.length > 0 && (
        <IndustryTable data={value} deleteItem={deleteItem} />
      )}
    </>
  );
};

export default App;
