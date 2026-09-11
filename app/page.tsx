import { getClients } from "@/lib/clients";
import { getPublications } from "@/lib/publications";
import Board from "./components/Board";
import ListboxMenu from "./components/Listbox";

export default async function Home() {
    const clients = await getClients();
    const publications = await getPublications();

    return (
        <main className="bg-[#F6F5F2] min-h-screen w-full">

            {/* Header */}
            <section className="bg-[#F6F5F2] w-full flex justify-start">
                <div className="px-6 py-5">
                    <ListboxMenu clients={clients} />
                </div>
            </section>

            {/* Kanban */}
            <section className="bg-[#FAFAFA]">
                <Board publications={publications}/>
            </section>

        </main>
    );
}