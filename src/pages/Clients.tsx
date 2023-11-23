import ClientsList from "../components/Table/ClientsList";

export default function Clients() {
  return (
    <div className="flex w-full p-5">
      <ClientsList userDetail={{ id: "" }} />
    </div>
  );
}
