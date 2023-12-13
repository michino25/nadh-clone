import { Button, InputNumber } from "antd";
import { useState } from "react";
import useFilter from "src/hooks/useFilter";

export default function SearchNumber({
  columnKey,
  closeFn,
}: {
  columnKey: string;
  closeFn: () => void;
}) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();

  const [from, setFrom] = useState(getAllParams()[columnKey + "_from"]);
  const [to, setTo] = useState(getAllParams()[columnKey + "_to"]);

  const submit = () => {
    //   // console.log(filter);
    if (to || from) {
      if (from) changeOneFilter(getAllParams(), columnKey + "_from", from);
      if (to) changeOneFilter(getAllParams(), columnKey + "_to", to);
    } else reset();
    closeFn();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), columnKey + "_from");
    removeOneFilter(getAllParams(), columnKey + "_to");
    setFrom(null);
    setTo(null);
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

      <InputNumber
        min={0}
        style={{ width: "100%" }}
        placeholder={"From"}
        // value={from}
        value={getAllParams()[columnKey + "_from"] && from}
        onChange={setFrom}
        onPressEnter={submit}
        className="mt-3 block"
      />
      <InputNumber
        min={0}
        style={{ width: "100%" }}
        placeholder={"To"}
        // value={to}
        value={getAllParams()[columnKey + "_to"] && to}
        onChange={setTo}
        onPressEnter={submit}
        className="mt-3 block"
      />

      {from > to && (
        <span className="block w-[160px] mt-2 text-red-500/80 font-medium text-sm">
          * From's value must be lower than to's value
        </span>
      )}
    </div>
  );
}
