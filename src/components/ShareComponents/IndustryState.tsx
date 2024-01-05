import IndustryTable from "components/DataDisplay/IndustryTable";
import FormIndustry from "containers/Client/components/FormIndustry";
import { iIndustry } from "utils/models";

export default function IndustryState({
  industry,
  setIndustry,
}: {
  industry: iIndustry[];
  setIndustry: (value: iIndustry[]) => void;
}) {
  const deleteItem = (id: string) => {
    if (industry)
      setIndustry(industry.filter((item: iIndustry) => item.id !== id));
  };

  const primaryItem = (id: string) => {
    console.log(id);
    console.log(industry);

    if (industry)
      setIndustry(
        industry.map((item: iIndustry) =>
          item.id === id
            ? {
                ...item,
                primary: item.primary ? item.primary * -1 : 1,
              }
            : item
        )
      );
  };

  return (
    <>
      <FormIndustry
        saveData={(data) => setIndustry([...(industry as iIndustry[]), data])}
      />
      <IndustryTable
        data={industry}
        deleteItem={deleteItem}
        primaryItem={primaryItem}
      />
    </>
  );
}
