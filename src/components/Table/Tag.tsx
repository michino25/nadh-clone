import { Tag } from "antd";
import { removeOneFilter } from "utils/filter";
import { getStore } from "utils/localStorage";

const App = ({
  tableName,
  refetch,
}: {
  tableName: string;
  refetch: () => void;
}) => {
  const removedTag = (tag: string) => {
    console.log(tag);
    removeOneFilter(tableName, tag, refetch);
  };

  return (
    <>
      {Object.keys(getStore(tableName).filter).map((tag: string) => (
        <span key={tag} className="inline-block mb-6">
          <Tag
            closable
            color="#108ee9"
            onClose={(e) => {
              e.preventDefault();
              removedTag(tag);
            }}
          >
            {tag}: {getStore(tableName).filter[tag]}
          </Tag>
        </span>
      ))}
    </>
  );
};

export default App;
