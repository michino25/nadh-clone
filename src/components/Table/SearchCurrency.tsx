import { currencyData } from "_constants/index";
import { Button, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import useFilter from "src/hooks/useFilter";
import numeral from "numeral";

export default function SearchCurrency({
  columnKey,
  closeFn,
}: {
  columnKey: string;
  closeFn: () => void;
}) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();

  const [from, setFrom] = useState(getAllParams()[columnKey + "_from"]);
  const [to, setTo] = useState(getAllParams()[columnKey + "_to"]);
  const [currency, setCurrency] = useState("2");

  useEffect(() => {
    const data = getAllParams()[columnKey]?.split(",");
    if (data && data.length > 0) {
      data[0] !== "-" && setFrom(data[0]);
      data[1] !== "-" && setTo(data[1]);
      setCurrency(data[2]);
    }
  }, [window.location.href]);

  const submit = () => {
    //   // console.log(filter);
    if (from || to) {
      if (!((!!to || to === 0) && !!from && from > to)) {
        changeOneFilter(
          getAllParams(),
          columnKey,
          (from || "-") + "," + (to || "-") + "," + currency
        );
        closeFn();
      }
    } else reset();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), columnKey);
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
        value={from}
        defaultValue={getAllParams()[columnKey + "_from"] || from}
        onChange={setFrom}
        onPressEnter={submit}
        className="mt-3 block"
        formatter={(value: number | string) =>
          value ? numeral(value).format("0,0") : ""
        }
        parser={(value?: string) => numeral(value).value()}
      />

      <InputNumber
        min={0}
        style={{ width: "100%" }}
        placeholder={"To"}
        value={to}
        defaultValue={getAllParams()[columnKey + "_to"] || to}
        onChange={setTo}
        onPressEnter={submit}
        className="mt-3 block"
        formatter={(value: number | string) =>
          value ? numeral(value).format("0,0") : ""
        }
        parser={(value?: string) => numeral(value).value()}
      />

      <Select
        value={currency}
        style={{ width: "100%" }}
        onChange={setCurrency}
        options={currencyData}
        className="mt-3 block"
      />

      {(!!to || to === 0) && !!from && from > to && (
        <span className="block w-[160px] mt-2 text-red-500/80 font-medium text-sm">
          * From's value must be lower than to's value
        </span>
      )}
    </div>
  );
}
