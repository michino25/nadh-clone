import { Button, InputNumber } from "antd";
import { useState } from "react";
import { changeOneFilter, removeOneFilter } from "utils/filter";
import { getStore } from "utils/localStorage";

export default function SearchNumber({
  columnKey,
  table,
  refetch,
}: {
  columnKey: string;
  table: string;
  refetch: () => void;
}) {
  const [from, setFrom] = useState(
    getStore(table)?.filter[columnKey + "_from"]
  );

  const [to, setTo] = useState(getStore(table)?.filter[columnKey + "_to"]);

  const submit = () => {
    //   // console.log(filter);
    if (to || from) {
      if (from) changeOneFilter(table, columnKey + "_from", from, refetch);
      if (to) changeOneFilter(table, columnKey + "_to", to, refetch);
    } else reset();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(table, columnKey + "_from", refetch);
    removeOneFilter(table, columnKey + "_to", refetch);
    setFrom(null);
    setTo(null);
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

      <InputNumber
        min={0}
        style={{ width: "100%" }}
        placeholder={"From"}
        // value={from}
        value={getStore(table)?.filter[columnKey + "_from"] && from}
        onChange={setFrom}
        onPressEnter={submit}
        className="mt-3 block"
      />
      <InputNumber
        min={0}
        style={{ width: "100%" }}
        placeholder={"To"}
        // value={to}
        value={getStore(table)?.filter[columnKey + "_to"] && to}
        onChange={setTo}
        onPressEnter={submit}
        className="mt-3 block"
      />

      {from >= to && (
        <span className="block w-[160px] mt-2 text-red-500/80 font-medium text-sm">
          * From's value must be lower than to's value
        </span>
      )}
    </div>
  );
}
