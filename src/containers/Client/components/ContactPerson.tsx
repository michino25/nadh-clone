import ContactPersonModel from "./ContactPersonModel";
import ContactPersonTable from "./ContactPersonTable";

export default function ContactPerson({
  data,
  setData,
}: {
  data: any;
  setData: (value: any) => void;
}) {
  return (
    <div className="w-full">
      <ContactPersonModel setData={setData} />
      <ContactPersonTable deleteItem={() => {}} data={data} />
    </div>
  );
}
