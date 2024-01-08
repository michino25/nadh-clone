import { Select, Form } from "antd";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";
import { iOption, iOption2 } from "_constants/index";
import { useEffect } from "react";

interface iData {
  direction?: "row" | "col";
  industry: iOption | undefined;
  setIndustry: (value: iOption | undefined) => void;
  sector: iOption | undefined;
  setSector: (value: iOption | undefined) => void;
  category: iOption | undefined;
  setCategory: (value: iOption | undefined) => void;
  industry_id?: string;
  sectorData: iOption[] | undefined;
  setSectorData: (value: iOption[] | undefined) => void;
  categoryData: iOption[] | undefined;
  setCategoryData: (value: iOption[] | undefined) => void;
}

const filterOption = (input: string, option?: iOption) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function Industry({
  direction = "col",
  industry,
  setIndustry,
  sector,
  setSector,
  category,
  setCategory,
  industry_id,
  sectorData,
  setSectorData,
  categoryData,
  setCategoryData,
}: iData) {
  // industry: {key: 54, label: 'INDUSTRIAL & MANUFACTURING'}
  // sector: {key: 92, label: 'IDM. - NATURAL RESOURCES'}

  const { isPending: industryIsPending, data: industryData } = useQuery({
    queryKey: ["industry"],
    queryFn: async () => await otherApi.getIndustry({ type: 1 }),
    select: (res) =>
      res.data.data.map((item: iOption2) => ({
        value: item.key,
        label: item.label,
      })),
  });

  // console.log(industryData);

  const { isPending: allIndustryIsPending, data: allIndustryData } = useQuery({
    queryKey: ["all_industries"],
    queryFn: async () => await otherApi.getIndustry({ getAll: true }),
    select: (res) =>
      res.data.data.map(
        (item: { key: number; label: string; parent_id: number }) => ({
          value: item.key,
          label: item.label,
          parent_id: item.parent_id,
        })
      ),
  });

  const initData = () => {
    if (industry_id) {
      const data: iOption[] = [];
      const init = parseInt(industry_id);

      const option = allIndustryData.filter(
        (item: { value: number; label: string; parent_id: number }) =>
          item.value === init
      )[0];

      data.push(option);

      if (option.parent_id) {
        const option2 = allIndustryData.filter(
          (item: { value: number; label: string; parent_id: number }) =>
            item.value === option.parent_id
        )[0];
        data.push(option2);

        if (option2.parent_id) {
          const option3 = allIndustryData.filter(
            (item: { value: number; label: string; parent_id: number }) =>
              item.value === option2.parent_id
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
      setSector(undefined);
      setCategory(undefined);
      setIndustry(undefined);
    }
  };

  useEffect(() => {
    if (!allIndustryIsPending) initData();
  }, [allIndustryIsPending, industry_id, window.location.href]);

  const getChildren = (key: number) =>
    allIndustryData.filter(
      (item: { value: number; label: string; parent_id: number }) =>
        item.parent_id === key
    );

  const handleChangeIndustry = (value: number) => {
    setIndustry(
      industryData.filter((item: iOption) => item.value === value)[0]
    );

    if (value) setSectorData(getChildren(value));
    else setSectorData(undefined);
    setSector(undefined);

    setCategoryData(undefined);
    setCategory(undefined);
  };

  const handleChangeSector = (value: number) => {
    setSector(sectorData?.filter((item: iOption) => item.value === value)[0]);

    if (value) setCategoryData(getChildren(value));
    else setCategoryData(undefined);

    setCategory(undefined);
  };

  const handleChangeCategory = (value: number) => {
    setCategory(
      categoryData?.filter((item: iOption) => item.value === value)[0]
    );
  };

  return (
    <>
      <Form.Item className={direction === "row" ? "w-1/3 mb-3" : "w-full mb-3"}>
        <Select
          allowClear
          showSearch
          loading={industryIsPending || allIndustryIsPending}
          filterOption={filterOption}
          options={industryData}
          value={industry ? (industry.value as number) : undefined}
          onChange={handleChangeIndustry}
          placeholder="Industry"
        />
      </Form.Item>

      <Form.Item className={direction === "row" ? "w-1/3 mb-3" : "w-full mb-3"}>
        <Select
          allowClear
          showSearch
          filterOption={filterOption}
          loading={industryIsPending || allIndustryIsPending}
          options={sectorData}
          value={sector ? (sector.value as number) : undefined}
          disabled={!sectorData}
          onChange={handleChangeSector}
          placeholder="Sector"
        />
      </Form.Item>

      <Form.Item className={direction === "row" ? "w-1/3 mb-3" : "w-full mb-3"}>
        <Select
          allowClear
          showSearch
          filterOption={filterOption}
          loading={industryIsPending || allIndustryIsPending}
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
