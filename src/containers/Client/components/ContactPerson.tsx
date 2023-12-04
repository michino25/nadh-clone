import ContactPersonModel from "./ContactPersonModel";
import ContactPersonTable from "./ContactPersonTable";

export default function ContactPerson({ data }: { data: any }) {
  return (
    <>
      <ContactPersonModel />
      <ContactPersonTable data={data} />
    </>
  );
}
