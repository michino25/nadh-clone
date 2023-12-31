import { getColByKey, rawColumnsByTable } from "_constants/index";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import useFilter from "src/hooks/useFilter";

export default function SearchSelect({
  columnKey,
  table,
  filterSelectData,
  closeFn,
}: {
  columnKey: string;
  table: string;
  filterSelectData: any;
  closeFn: () => void;
}) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();

  const [selected, setSelected] = useState(getAllParams()[columnKey]);

  useEffect(() => {
    setSelected(getAllParams()[columnKey]);
  }, [window.location.href]);

  const submit = () => {
    //   // console.log(filter);
    if (selected) {
      changeOneFilter(getAllParams(), columnKey, selected);
      closeFn();
    } else reset();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), columnKey);
    setSelected(null);
    closeFn();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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

      <Select
        className="w-[200px] mt-3"
        showSearch
        allowClear
        value={selected}
        defaultValue={getAllParams()[columnKey] && selected}
        placeholder={
          "Select a " + getColByKey(rawColumnsByTable(table), columnKey).title
        }
        optionFilterProp="children"
        onChange={setSelected}
        filterOption={filterOption}
        options={filterSelectData[columnKey]}
      />
    </div>
  );
}
