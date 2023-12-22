import { getColByKey, iOption, rawColumnsByTable } from "_constants/index";
import { Button } from "antd";
import Industry from "components/DataEntry/Industry";
import { useState } from "react";
import useFilter from "src/hooks/useFilter";

export default function SearchIndustry({
  columnKey,
  table,
  closeFn,
}: {
  columnKey: string;
  table: string;
  closeFn: () => void;
}) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();

  const [industry, setIndustry] = useState<iOption>();
  const [sector, setSector] = useState<iOption>();
  const [category, setCategory] = useState<iOption>();

  const [sectorData, setSectorData] = useState<iOption[]>();
  const [categoryData, setCategoryData] = useState<iOption[]>();

  const keySearch = getColByKey(rawColumnsByTable(table), columnKey).search;

  // const [resetData, setResetData] = useState<() => void>(() => {});

  const getData = () => {
    if (category) return category.value;
    if (sector) return sector.value;
    if (industry) return industry.value;
  };

  const submit = () => {
    const industry_id = getData();
    //   // console.log(filter);
    if (industry_id) {
      changeOneFilter(getAllParams(), keySearch, industry_id.toString());
      closeFn();
    } else reset();
  };

  // value={getAllParams()[columnKey] && selected}

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), keySearch);
    setIndustry(undefined);
    setSector(undefined);
    setCategory(undefined);
    setSectorData(undefined);
    setCategoryData(undefined);
    closeFn();
  };

  return (
    <div className="p-3" onKeyDown={(e) => e.stopPropagation()}>
      <div className="w-full flex justify-between gap-2">
        <Button className="w-1/2" type="primary" onClick={submit} size="small">
          Search
        </Button>
        <Button className="w-1/2" onClick={reset} size="small">
          Reset
        </Button>
      </div>

      <div className="flex-col w-[300px] mt-3 space-y-3">
        <Industry
          industry={industry}
          setIndustry={setIndustry}
          sector={sector}
          setSector={setSector}
          category={category}
          setCategory={setCategory}
          industry_id={getAllParams()[keySearch]}
          sectorData={sectorData}
          setSectorData={setSectorData}
          categoryData={categoryData}
          setCategoryData={setCategoryData}
        />
      </div>
    </div>
  );
}
