import { getColByKey, rawColumnsByTable } from "_constants/index";
import { Button, Input } from "antd";
import { useState } from "react";
import useFilter from "src/hooks/useFilter";

export default function SearchInput({
  columnKey,
  table,
  closeFn,
}: {
  columnKey: string;
  table: string;
  closeFn: () => void;
}) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();

  const [filter, setFilter] = useState(
    getAllParams()[columnKey] ? getAllParams()[columnKey] : ""
  );

  const submit = () => {
    // console.log(filter);
    if (filter) {
      changeOneFilter(getAllParams(), columnKey, filter);
    } else removeOneFilter(getAllParams(), columnKey);
    closeFn();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), columnKey);
    setFilter("");
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

      <Input
        placeholder={
          "Search " + getColByKey(rawColumnsByTable(table), columnKey).title
        }
        value={getAllParams()[columnKey] && filter}
        onChange={(e) => setFilter(e.target.value)}
        onPressEnter={submit}
        className="mt-3 block"
      />
    </div>
  );
}
