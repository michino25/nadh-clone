import IndustryTable from "components/DataDisplay/IndustryTable";
import FormIndustry from "containers/Client/components/FormIndustry";

export default function IndustryState({
  industry,
  setIndustry,
}: {
  industry: any[];
  setIndustry: (value: any[]) => void;
}) {
  const deleteItem = (id: string) => {
    if (industry) setIndustry(industry.filter((item: any) => item.id !== id));
  };

  const primaryItem = (id: string) => {
    console.log(id);
    console.log(industry);

    if (industry)
      setIndustry(
        industry.map((item: any) =>
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
        saveData={(data) => setIndustry([...(industry as any[]), data])}
      />
      <IndustryTable
        data={industry}
        deleteItem={deleteItem}
        primaryItem={primaryItem}
      />
    </>
  );
}
