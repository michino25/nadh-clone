import {
  getColByKey,
  getSelectByValue,
  rawColumnsByTable,
} from "_constants/index";
import { Tag } from "antd";
import useFilter from "src/hooks/useFilter";

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
      removeOneFilter(colName + "_from", getAllParams());
      removeOneFilter(colName + "_to", getAllParams());
    } else removeOneFilter(tag, getAllParams());
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

  const multiSelectHander = (paramItem: string, tagName: string) => {
    return paramItem
      .split(",")
      .map(
        (item: any) => getSelectByValue(filterSelectData[tagName], item).label
      )
      .join(", ");
  };

  const fromToHander = (tagName: string, nextTagName: string) => {
    const valueNext = nextTagName ? " to " + getAllParams()[nextTagName] : "";
    return (
      (tagName.match(/_(from)$/) ? "from " : "to ") +
      getAllParams()[tagName] +
      valueNext
    );
  };

  return (
    <>
      {orderTag.map((tag: string, index: number, array: any[]) => {
        const col =
          tag === "page"
            ? pageCol
            : getColByKey(tableCol, tag.replace(/_(from|to)$/, ""));
        console.log(col);
        console.log(tag);

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
                fromToHander(
                  tag,
                  index !== array.length - 1 ? array[index + 1] : ""
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
                multiSelectHander(getAllParams()[tag], tag),
                tag
              )}
          </span>
        );
      })}
    </>
  );
};

export default App;
