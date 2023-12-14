import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, DatePicker } from "antd";
import useFilter from "src/hooks/useFilter";

dayjs.extend(customParseFormat);

const formatDate = (date: dayjs.Dayjs, format: string) => {
  return date.format(format);
};

export default function SearchDate({
  columnKey,
  closeFn,
}: {
  columnKey: string;
  closeFn: () => void;
}) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();

  const [from, setFrom] = useState(
    getAllParams()[columnKey + "_from"] &&
      dayjs(getAllParams()[columnKey + "_from"])
  );
  const [to, setTo] = useState(
    getAllParams()[columnKey + "_to"] &&
      dayjs(getAllParams()[columnKey + "_to"])
  );

  useEffect(() => {
    setFrom(
      getAllParams()[columnKey + "_from"] &&
        dayjs(getAllParams()[columnKey + "_from"])
    );
    setTo(
      getAllParams()[columnKey + "_to"] &&
        dayjs(getAllParams()[columnKey + "_to"])
    );
  }, [window.location.href]);

  const submit = () => {
    console.log(to, from);
    if (to || from) {
      if (from) changeOneFilter(getAllParams(), columnKey + "_from", from);
      if (to) changeOneFilter(getAllParams(), columnKey + "_to", to);
      closeFn();
    } else reset();
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
