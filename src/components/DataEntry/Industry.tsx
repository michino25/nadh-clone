import { Select, Form, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";
import { iOption } from "_constants/index";
import { useEffect, useState } from "react";

interface iData {
  industry: iOption | undefined;
  setIndustry: (value: iOption | undefined) => void;
  sector: iOption | undefined;
  setSector: (value: iOption | undefined) => void;
  category: iOption | undefined;
  setCategory: (value: iOption | undefined) => void;
  industry_id?: string;
}

const filterOption = (input: string, option?: iOption) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function Industry({
  industry,
  setIndustry,
  sector,
  setSector,
  category,
  setCategory,
  industry_id,
}: iData) {
  // industry: {key: 54, label: 'INDUSTRIAL & MANUFACTURING'}
  // sector: {key: 92, label: 'IDM. - NATURAL RESOURCES'}

  const [sectorData, setSectorData] = useState<iOption[]>();
  const [categoryData, setCategoryData] = useState<iOption[]>();

  const { isPending: industryIsPending, data: industryData } = useQuery({
    queryKey: ["industry"],
    queryFn: async () =>
      await otherApi.getIndustry({ type: 1 }).then((res: any) =>
        res.data.data.map((item: any) => ({
          value: item.key,
          label: item.label,
        }))
      ),
  });

  // console.log(industryData);

  const { isPending: allIndustryIsPending, data: allIndustryData } = useQuery({
    queryKey: ["allindustry"],
    queryFn: async () =>
      await otherApi.getIndustry({ getAll: true }).then((res: any) =>
        res.data.data.map((item: any) => ({
          value: item.key,
          label: item.label,
          parent_id: item.parent_id,
        }))
      ),
  });

  const initData = () => {
    if (industry_id) {
      const data: iOption[] = [];
      const init = parseInt(industry_id);

      const option = allIndustryData.filter(
        (item: any) => item.value === init
      )[0];

      data.push(option);

      if (option.parent_id) {
        const option2 = allIndustryData.filter(
          (item: any) => item.value === option.parent_id
        )[0];
        data.push(option2);

        if (option2.parent_id) {
          const option3 = allIndustryData.filter(
            (item: any) => item.value === option2.parent_id
          )[0];
          data.push(option3);
        }
      }

      data.reverse();

      if (data[0]) {
        setIndustry(data[0]);
        setSectorData(getChildren(data[0].value as number));
      }

      if (data[1]) {
        setSector(data[1]);
        setCategoryData(getChildren(data[1].value as number));
      }

      if (data[2]) setCategory(data[2]);
    } else {
      setSectorData(undefined);
      setCategoryData(undefined);
    }
  };

  useEffect(() => {
    if (!allIndustryIsPending) initData();
  }, [allIndustryIsPending, industry_id]);

  const getChildren = (key: number) =>
    allIndustryData.filter((item: any) => item.parent_id === key);

  const handleChangeIndustry = (value: number) => {
    setIndustry(industryData.filter((item: any) => item.value === value)[0]);

    setSectorData(getChildren(value));
    setSector(undefined);

    setCategoryData([]);
    setCategory(undefined);
  };

  const handleChangeSector = (value: number) => {
    setSector(sectorData?.filter((item: any) => item.value === value)[0]);

    setCategoryData(getChildren(value));
    setCategory(undefined);
  };

  const handleChangeCategory = (value: number) => {
    setCategory(categoryData?.filter((item: any) => item.value === value)[0]);
  };

  if (industryIsPending || allIndustryIsPending) return <Skeleton active />;

  return (
    <>
      <Form.Item className="w-full mb-3">
        <Select
          allowClear
          showSearch
          filterOption={filterOption}
          options={industryData}
          value={industry ? (industry.value as number) : undefined}
          onChange={handleChangeIndustry}
          placeholder="Industry"
        />
      </Form.Item>

      <Form.Item className="w-full mb-3">
        <Select
          allowClear
          showSearch
          filterOption={filterOption}
          options={sectorData}
          value={sector ? (sector.value as number) : undefined}
          disabled={!sectorData}
          onChange={handleChangeSector}
          placeholder="Sector"
        />
      </Form.Item>

      <Form.Item className="w-full mb-3">
        <Select
          allowClear
          showSearch
          filterOption={filterOption}
          options={categoryData}
          value={category ? (category.value as number) : undefined}
          disabled={!categoryData}
          onChange={handleChangeCategory}
          placeholder="Category"
        />
      </Form.Item>
    </>
  );
}