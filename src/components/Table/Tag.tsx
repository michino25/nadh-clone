import {
  currencyData,
  getColByParam,
  getSelectByValue,
  iOption2,
  rawColumnsByTable,
} from "_constants/index";
import { Tag } from "antd";
import { otherApi } from "apis/index";
import useFilter from "src/hooks/useFilter";
import { useQuery } from "@tanstack/react-query";
import numeral from "numeral";

const pageCol = { title: "Page" };

function sortByOrder(arr: any[], order: any[]) {
  const orderMap = new Map();
  order.forEach((value, index) => orderMap.set(value, index));

  arr.sort((a, b) => {
    const orderA = orderMap.get(a);
    const orderB = orderMap.get(b);

    // If an element is not in the order array, consider it greater
    if (orderA === undefined) return 1;
    if (orderB === undefined) return -1;

    return orderA - orderB;
  });

  return arr;
}

const App = ({
  tableName,
  filterSelectData,
}: {
  tableName: string;
  filterSelectData?: any;
}) => {
  const { removeOneFilter, getAllParams } = useFilter();

  const removedTag = (tag: string, type?: "number" | "date") => {
    console.log(tag);
    if (type) {
      const colName = tag.replace(/_(from|to)$/, "");
      removeOneFilter(getAllParams(), colName + "_from");
      removeOneFilter(getAllParams(), colName + "_to");
    } else removeOneFilter(getAllParams(), tag);
  };

  const tagName = (
    tagName: string,
    tagContent: string,
    tag: string,
    type?: "number" | "date"
  ) => (
    <Tag
      closable
      onClose={(e) => {
        e.preventDefault();
        removedTag(tag, type);
      }}
    >
      {tagName}: {tagContent}
    </Tag>
  );

  const tableCol = rawColumnsByTable(tableName);

  const orderTag = sortByOrder(
    Object.keys(getAllParams()),
    tableCol.map((item) => item.key)
  );

  const multiSelectHandler = (paramItem: string, tagName: string) => {
    return paramItem
      .split(",")
      .map(
        (item: any) => getSelectByValue(filterSelectData[tagName], item).label
      )
      .join(", ");
  };

  const fromToHandler = (
    tagName: string,
    nextTagName: string,
    type: string
  ) => {
    const valueNext = nextTagName
      ? " to " +
        (type === "number"
          ? numeral(getAllParams()[nextTagName]).format("0,0")
          : getAllParams()[nextTagName])
      : "";
    return (
      (tagName.match(/_(from)$/) ? "from " : "to ") +
      (type === "number"
        ? numeral(getAllParams()[tagName]).format("0,0")
        : getAllParams()[tagName]) +
      valueNext
    );
  };

  const { isPending: allIndustryIsPending, data: allIndustryData } = useQuery({
    queryKey: ["allindustry"],
    queryFn: async () =>
      await otherApi.getIndustry({ getAll: true }).then((res: any) =>
        res.data.data.map((item: any) => ({
          value: item.key,
          label: item.label,
          parent_id: item.parent_id,
        }))
      ),
  });

  const industryHandler = (paramItem: string) => {
    if (paramItem) {
      const data = [];
      const init = parseInt(paramItem);

      const option = allIndustryData.filter(
        (item: any) => item.value === init
      )[0];

      data.push(option.label);

      if (option.parent_id) {
        const option2 = allIndustryData.filter(
          (item: any) => item.value === option.parent_id
        )[0];
        data.push(option2.label);

        if (option2.parent_id) {
          const option3 = allIndustryData.filter(
            (item: any) => item.value === option2.parent_id
          )[0];
          data.push(option3.label);
        }
      }

      data.reverse();
      return data.join(" / ");
    }
    return "";
  };

  const { isPending: cityIsPending, data: cityData } = useQuery({
    queryKey: ["city"],
    queryFn: async () =>
      await otherApi.getLocation(1, "1280").then((res) =>
        res.data.data.map((item: iOption2) => ({
          value: item.key.toString(),
          label: item.label,
        }))
      ),
  });

  const { data: countryData, isPending: countryIsPending } = useQuery({
    queryKey: ["country"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) =>
        res.data.data.map((item: iOption2) => ({
          value: item.key.toString(),
          label: item.label,
        }))
      ),
  });

  const cityHandler = (paramItem: string) => {
    const data = paramItem.split(",");
    if (data[0]) {
      if (data[0] === "1280") {
        const city = data[1]
          ? " / " +
            cityData.filter((item: any) => item.value === data[1])[0].label
          : "";
        return "Viet Nam" + city;
      } else {
        const country = countryData.filter(
          (item: any) => item.value === data[0]
        )[0].label;
        return country;
      }
    }
    return "";
  };

  const currencyHandler = (paramItem: string) => {
    const data = paramItem.split(",");
    const currency = " " + getSelectByValue(currencyData, data[2]).label;
    const from =
      data[0] !== "-"
        ? "from " + numeral(data[0]).format("0,0") + currency
        : "";
    const to =
      data[1] !== "-" ? "to " + numeral(data[1]).format("0,0") + currency : "";
    return from + " " + to;
  };

  return (
    <>
      {orderTag.map((tag: string, index: number, array: any[]) => {
        const col =
          tag === "page"
            ? pageCol
            : getColByParam(tableCol, tag.replace(/_(from|to)$/, ""));
        console.log(col);
        console.log(tag);
        console.log(col.type);

        // console.log(
        //   col.type === "select" &&
        //     getSelectByValue(filterSelectData[tag], getAllParams()[tag])
        // );

        if (tag === "page") return;

        return (
          <span key={tag} className="inline-block mb-6">
            {/* nomal input */}
            {!col.type && tagName(col.title, getAllParams()[tag], tag)}
            {/* number input */}
            {(col.type === "number" || col.type === "date") &&
              !(
                index !== 0 &&
                array[index].replace(/_(from|to)$/, "") ===
                  array[index - 1].replace(/_(from|to)$/, "")
              ) &&
              tagName(
                col.title,
                fromToHandler(
                  tag,
                  index !== array.length - 1 ? array[index + 1] : "",
                  col.type
                ),
                tag,
                col.type
              )}
            {/* select input */}
            {col.type === "select" &&
              filterSelectData[tag] &&
              tagName(
                col.title,
                getSelectByValue(filterSelectData[tag], getAllParams()[tag])
                  .label,
                tag
              )}
            {/* multi select input */}
            {col.type === "multiple_select" &&
              filterSelectData[tag] &&
              tagName(
                col.title,
                multiSelectHandler(getAllParams()[tag], tag),
                tag
              )}
            {col.type === "industry" &&
              !allIndustryIsPending &&
              tagName("Industry", industryHandler(getAllParams()[tag]), tag)}
            {col.type === "address" &&
              !(countryIsPending || cityIsPending) &&
              tagName("City", cityHandler(getAllParams()["city"]), "city")}
            {/* currency */}
            {col.type === "currency" &&
              tagName(col.title, currencyHandler(getAllParams()[tag]), tag)}
          </span>
        );
      })}
    </>
  );
};

export default App;
