import { Select, Button, Form, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { otherApi } from "apis/index";
import type { iOption } from "_constants/index";
import IndustryTable from "components/DataDisplay/IndustryTable";
import { v4 as uuidv4 } from "uuid";

interface iDataInput {
  value: any;
  setValue: (value: any) => void;
}

const App = ({ value, setValue }: iDataInput) => {
  const [subIndustry, setSubIndustry] = useState<iOption[]>([]);
  const [industry, setIndustry] = useState<iOption>();
  const [sector, setSector] = useState<iOption>();

  const { isPending: industryIsPending, data: industryData } = useQuery({
    queryKey: ["industry"],
    queryFn: async () =>
      await otherApi.getIndustry({ type: 1 }).then((res: any) =>
        res.data.data.map((item: any) => ({
          ...item,
          value: JSON.stringify(item),
        }))
      ),
  });

  const { isPending: subIndustryIsPending, data: subIndustryData } = useQuery({
    queryKey: ["subindustry"],
    queryFn: async () =>
      await otherApi
        .getIndustry({ getAll: true })
        .then((res: any) => res.data.data),
  });

  const getSubIndustry = (value: number) => {
    setSubIndustry(
      subIndustryData
        .filter((item: any) => item.parent_id === value)
        .map((item: any) => ({ label: item.label, key: item.key }))
        .map((item: any) => ({
          label: item.label,
          value: JSON.stringify(item),
        }))
    );
  };

  const handleChangeIndustry = (value: string) => {
    const industry = JSON.parse(value);
    setIndustry(industry);

    // const keys = Object.keys(value);
    // const data = {
    //   [keys[0]]: JSON.parse(value[keys[0]]),
    // };

    getSubIndustry(industry.key);
  };

  const handleChangeSector = (value: string) => {
    const sector = JSON.parse(value);
    setSector(sector);
  };

  const saveData = () => {
    setValue([
      ...value,
      {
        id: uuidv4(),
        industry,
        sector,
      },
    ]);
  };

  const deleteItem = (id: string) => {
    setValue(value.filter((item: any) => item.id !== id));
  };

  // console.log(value);

  if (industryIsPending || subIndustryIsPending) return <Skeleton active />;

  return (
    <>
      <Form.Item label="Industry" className="mb-0">
        <div className="flex space-x-4">
          <div className="flex-col w-full justify-between items-center">
            <div className="flex w-full space-x-3">
              <Form.Item className="w-full mb-3">
                <Select
                  placeholder="Industry"
                  onChange={handleChangeIndustry}
                  options={industryData}
                />
              </Form.Item>

              <Form.Item className="w-full mb-3">
                <Select
                  options={subIndustry}
                  onChange={handleChangeSector}
                  placeholder="Sector"
                />
              </Form.Item>

              <Form.Item className="w-full mb-3">
                <Select options={[]} placeholder="Category" />
              </Form.Item>
            </div>

            <div className="flex justify-end pb-4">
              <Button
                disabled={subIndustry.length === 0}
                onClick={saveData}
                type="primary"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form.Item>
      <IndustryTable data={value} deleteItem={deleteItem} />
    </>
  );
};

export default App;
