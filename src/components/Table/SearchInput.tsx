import { getColByKey, rawColumnsByTable } from "_constants/index";
import { Button, Input } from "antd";
import { useState } from "react";
import { changeOneFilter, removeOneFilter } from "utils/filter";
import { getStore } from "utils/localStorage";

export default function SearchInput({
  columnKey,
  table,
  refetch,
}: {
  columnKey: string;
  table: string;
  refetch: () => void;
}) {
  const [filter, setFilter] = useState(
    getStore(table)?.filter[columnKey] ? getStore(table)?.filter[columnKey] : ""
  );

  const submit = () => {
    // console.log(filter);
    if (filter) {
      changeOneFilter(table, columnKey, filter, refetch);
    } else removeOneFilter(table, columnKey, refetch);
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(table, columnKey, refetch);
    setFilter("");
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
        value={getStore(table)?.filter[columnKey] && filter}
        onChange={(e) => setFilter(e.target.value)}
        onPressEnter={submit}
        className="mt-3 block"
      />
    </div>
  );
}
