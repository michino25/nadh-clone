import { getColByKey, rawColumnsByTable } from "_constants/index";
import { Button, Select } from "antd";
import { useState } from "react";
import { changeOneFilter, removeOneFilter } from "utils/filter";
import { getStore } from "utils/localStorage";

export default function SearchSelect({
  columnKey,
  table,
  refetch,
  filterSelectData,
}: {
  columnKey: string;
  table: string;
  refetch: () => void;
  filterSelectData: any;
}) {
  const [selected, setSelected] = useState(getStore(table)?.filter[columnKey]);

  const submit = () => {
    //   // console.log(filter);
    if (selected) {
      changeOneFilter(table, columnKey, selected, refetch);
    } else reset();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(table, columnKey, refetch);
    setSelected(null);
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
        value={getStore(table)?.filter[columnKey] && selected}
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
