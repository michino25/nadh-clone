import { Tag } from "antd";
import { getStore, saveStore } from "utils/localStorage";

const App = ({
  tableName,
  refetch,
}: {
  tableName: string;
  refetch: () => void;
}) => {
  const removedTag = (tag: string) => {
    console.log(tag);
    const tableProp = getStore(tableName);
    delete tableProp.filter[tag];
    saveStore(tableName, tableProp);
    refetch();
  };

  return (
    <div className="mb-5">
      {Object.keys(getStore(tableName).filter).map((tag: string) => (
        <span key={tag} className="inline-block">
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
    </div>
  );
};

export default App;
