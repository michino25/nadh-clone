import IndustryTable from "components/DataDisplay/IndustryTable";
import FormIndustry from "containers/Client/components/FormIndustry";

export default function IndustryAPI({ data, updateFn, loading }: any) {
  const addIndustry = (formdata: any) => {
    const newData: any = {};
    if (formdata.industry) newData.industry_id = formdata.industry.value;
    if (formdata.sector) newData.sector_id = formdata.sector.value;
    if (formdata.category) newData.category_id = formdata.category.value;
    newData.primary = -1;

    const transformedData =
      data &&
      data.length > 0 &&
      data.map((item: any) => {
        const transformedItem: any = {
          industry_id: item.industry.id,
          primary: item.primary,
        };

        if (item.sector) transformedItem.sector_id = item.sector.id;
        if (item.category) transformedItem.category_id = item.category.id;

        return transformedItem;
      });

    updateFn(transformedData ? [...transformedData, newData] : [newData]);
  };

  const deleteIndustry = (id: string) => {
    const transformedData = data
      .filter((item: any) => item.id !== id)
      .map((item: any) => {
        const transformedItem: any = {
          industry_id: item.industry.id,
          primary: item.primary,
        };

        if (item.sector) transformedItem.sector_id = item.sector.id;
        if (item.category) transformedItem.category_id = item.category.id;

        return transformedItem;
      });

    updateFn(transformedData);
  };

  const primaryIndustry = (id: string) => {
    const transformedData = data.map((item: any) => {
      const transformedItem: any = {
        industry_id: item.industry.id,
        primary: item.id === id ? item.primary * -1 : item.primary,
      };

      if (item.sector) transformedItem.sector_id = item.sector.id;
      if (item.category) transformedItem.category_id = item.category.id;

      return transformedItem;
    });

    updateFn(transformedData);
  };

  return (
    <>
      <FormIndustry saveData={addIndustry} />
      <IndustryTable
        data={data}
        loading={loading}
        deleteItem={deleteIndustry}
        primaryItem={primaryIndustry}
      />
    </>
  );
}
