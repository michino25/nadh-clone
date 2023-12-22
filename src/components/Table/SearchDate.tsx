import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, DatePicker } from "antd";
import useFilter from "src/hooks/useFilter";
import { getColByKey, rawColumnsByTable } from "_constants/index";

dayjs.extend(customParseFormat);

const formatDate = (date: dayjs.Dayjs, format: string) => {
  return date.format(format);
};

export default function SearchDate({
  columnKey,
  table,
  closeFn,
}: {
  columnKey: string;
  table: string;
  closeFn: () => void;
}) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();
  const fromSearch =
    getColByKey(rawColumnsByTable(table), columnKey).search + "_from";
  const toSearch =
    getColByKey(rawColumnsByTable(table), columnKey).search + "_to";

  const [from, setFrom] = useState(
    getAllParams()[fromSearch] && dayjs(getAllParams()[fromSearch])
  );
  const [to, setTo] = useState(
    getAllParams()[toSearch] && dayjs(getAllParams()[toSearch])
  );

  useEffect(() => {
    setFrom(getAllParams()[fromSearch]);
    setTo(getAllParams()[toSearch]);
  }, [window.location.href]);

  const submit = () => {
    console.log(to, from);
    if (to || from) {
      if (from) changeOneFilter(getAllParams(), fromSearch, from);
      if (to) changeOneFilter(getAllParams(), toSearch, to);
      closeFn();
    } else reset();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), fromSearch);
    removeOneFilter(getAllParams(), toSearch);
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

      <DatePicker
        format="DD-MM-YYYY"
        value={from && dayjs(from)}
        placeholder="Start date"
        disabledDate={(date) => to && date > dayjs(to)}
        onChange={(date) =>
          setFrom(formatDate(date as dayjs.Dayjs, "YYYY-MM-DD"))
        }
        className="mt-3 block"
      />

      <DatePicker
        format="DD-MM-YYYY"
        value={to && dayjs(to)}
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
