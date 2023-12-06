import {
  getColByKey,
  getSelectByValue,
  rawColumnsByTable,
} from "_constants/index";
import { Tag } from "antd";
import { removeOneFilter } from "utils/filter";
import { getStore } from "utils/localStorage";

const App = ({
  tableName,
  refetch,
  filterSelectData,
}: {
  tableName: string;
  refetch: () => void;
  filterSelectData?: any;
}) => {
  const removedTag = (tag: string) => {
    console.log(tag);
    removeOneFilter(tableName, tag, refetch);
  };

  const tagName = (tagName: string, tagContent: string, tag: string) => (
    <Tag
      className="mb-6"
      closable
      color="#1677ff"
      onClose={(e) => {
        e.preventDefault();
        removedTag(tag);
      }}
    >
      {tagName}: {tagContent}
    </Tag>
  );

  return (
    <>
      {Object.keys(getStore(tableName).filter).map((tag: string) => {
        const col = getColByKey(
          rawColumnsByTable(tableName),
          tag.replace(/_(from|to)$/, "")
        );
        return (
          <span key={tag} className="inline-block">
            {/* nomal input */}
            {!col.type &&
              tagName(col.title, getStore(tableName).filter[tag], tag)}
            {/* number input */}
            {col.type === "number" ||
              (col.type === "date" &&
                tagName(
                  col.title + (tag.match(/_(from)$/) ? " from" : " to"),
                  getStore(tableName).filter[tag],
                  tag
                ))}
            {/* select input */}
            {col.type === "select" &&
              filterSelectData[tag] &&
              tagName(
                col.title,
                getSelectByValue(
                  filterSelectData[tag],
                  getStore(tableName).filter[tag]
                ).label,
                tag
              )}
          </span>
        );
      })}
    </>
  );
};

export default App;
