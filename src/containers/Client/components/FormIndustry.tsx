import { Button, Form } from "antd";
import { useState } from "react";
import type { iOption } from "_constants/index";
import { v4 as uuidv4 } from "uuid";
import Industry from "components/DataEntry/Industry";

interface iDataInput {
  saveData: (data: any) => void;
  label?: string;
}

const App = ({ saveData, label }: iDataInput) => {
  const [industry, setIndustry] = useState<iOption>();
  const [sector, setSector] = useState<iOption>();
  const [category, setCategory] = useState<iOption>();

  const [sectorData, setSectorData] = useState<iOption[]>();
  const [categoryData, setCategoryData] = useState<iOption[]>();

  return (
    <>
      <Form.Item label={label ?? "Industry"} className="mb-0">
        <div className="flex-col w-full justify-between items-center">
          <div className="flex w-full space-x-3">
            <Industry
              direction="row"
              industry={industry}
              setIndustry={setIndustry}
              sector={sector}
              setSector={setSector}
              category={category}
              setCategory={setCategory}
              sectorData={sectorData}
              setSectorData={setSectorData}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
            />
          </div>

          <div className="flex justify-end pb-4">
            <Button
              hidden={!industry}
              onClick={() => {
                saveData({
                  id: uuidv4(),
                  industry,
                  sector,
                  category,
                });
                setSectorData(undefined);
                setCategoryData(undefined);
                setCategory(undefined);
                setIndustry(undefined);
                setSector(undefined);
              }}
              type="primary"
            >
              Save Industry
            </Button>
          </div>
        </div>
      </Form.Item>
    </>
  );
};

export default App;
