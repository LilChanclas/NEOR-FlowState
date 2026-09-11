import { getClients } from "@/lib/clients";
import { getPublications } from "@/lib/publications";
import Dashboard from "./components/Dashboard";

export default async function Home() {
    const clients = await getClients();
    const publications = await getPublications();

    return (
        <main className="bg-[#F6F5F2] min-h-screen w-full">
            <Dashboard clients={clients} publications={publications} />
        </main>
    );
}