import ClientsList from "containers/Client/components/ClientsList";

export default function Clients() {
  return (
    <div className="flex w-full p-5">
      <ClientsList userDetail={{ id: "" }} />
    </div>
  );
}
