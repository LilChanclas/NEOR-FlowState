import { getClients } from "@/lib/clients";
import Dropdown from "./components/Listbox";

export default async function Home() {
  const clients = await getClients();
  return (
    <section className="bg-[#FAFAFA] w-full h-full flex justify-start">
      <div className="px-20 py-5">
        <Dropdown clients={clients} />
      </div>
    </section>
  );
}