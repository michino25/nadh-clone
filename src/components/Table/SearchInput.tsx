import { getColByKey, rawColumnsByTable } from "_constants/index";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
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

  const keySearch = getColByKey(rawColumnsByTable(table), columnKey).search;
  const [filter, setFilter] = useState(getAllParams()[keySearch] || "");

  useEffect(() => {
    setFilter(getAllParams()[keySearch] || "");
  }, [window.location.href]);

  const submit = () => {
    // console.log(filter);
    if (filter) {
      changeOneFilter(getAllParams(), keySearch, filter);
    } else removeOneFilter(getAllParams(), keySearch);
    closeFn();
  };

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), keySearch);
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
        value={filter}
        defaultValue={getAllParams()[keySearch] || filter}
        onChange={(e) => setFilter(e.target.value)}
        onPressEnter={submit}
        className="mt-3 block"
      />
    </div>
  );
}
