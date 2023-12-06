import { useState } from "react";
import { changeOneFilter, removeOneFilter } from "utils/filter";
import { getStore } from "utils/localStorage";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, DatePicker } from "antd";

dayjs.extend(customParseFormat);

const formatDate = (date: dayjs.Dayjs, format: string) => {
  return date.format(format);
};

export default function SearchDate({
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
    console.log(to, from);
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

      <DatePicker
        format="DD-MM-YYYY"
        value={getStore(table)?.filter[columnKey + "_from"] && dayjs(from)}
        placeholder="Start date"
        disabledDate={(date) => to && date > dayjs(to)}
        onChange={(date) =>
          setFrom(formatDate(date as dayjs.Dayjs, "YYYY-MM-DD"))
        }
        className="mt-3 block"
      />

      <DatePicker
        format="DD-MM-YYYY"
        value={getStore(table)?.filter[columnKey + "_to"] && dayjs(to)}
        placeholder="End date"
        disabledDate={(date) => from && date < dayjs(from)}
        onChange={(date) =>
          setTo(formatDate(date as dayjs.Dayjs, "YYYY-MM-DD"))
        }
        className="mt-3 block"
      />
    </div>
  );
}
