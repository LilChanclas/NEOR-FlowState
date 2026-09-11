import { getClients } from "@/lib/clients";
import { getPublications } from "@/lib/publications";
import ListboxMenu from "./components/Listbox";

const statuses = [
    "FALTA",
    "EN PRODUCCION",
    "REVISION INTERNA",
    "REVISION CLIENTE",
    "APROBADO",
    "PROGRAMADO",
    "PUBLICADO",
];

export default async function Home() {
    const clients = await getClients();
    const publications = await getPublications();

    return (
        <main className="bg-[#FAFAFA] min-h-screen w-full">

            {/* Header */}
            <section className="bg-[#FAFAFA] w-full flex justify-start">
                <div className="px-20 py-5">
                    <ListboxMenu clients={clients} />
                </div>
            </section>

            {/* Kanban */}
            <section className="p-10">
                <div className="flex gap-6 overflow-x-auto pb-4">

                    {statuses.map((status) => {
                        const statusPublications = publications.filter(
                            (publication) =>
                                publication.statuses?.name === status
                        );

                        return (
                            <div
                                key={status}
                                className="text-black bg-gray-100 rounded-lg p-4 min-w-[300px] w-[300px]"
                            >
                                {/* Estado */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-sm">
                                        {status}
                                    </h2>

                                    <span className="text-sm text-gray-500">
                                        {statusPublications.length}
                                    </span>
                                </div>

                                {/* Publicaciones */}
                                <div className="flex flex-col gap-4">

                                    {statusPublications.map((publication) => (
                                        <div
                                            key={publication.id}
                                            className="bg-white rounded-lg p-4 shadow-sm"
                                        >
                                            <h3 className="text-black font-semibold">
                                                {publication.clients?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-2">
                                                Formato:{" "}
                                                {publication.formats?.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Entrega:{" "}
                                                {publication.delivery_date ?? "Sin fecha"}
                                            </p>
                                        </div>
                                    ))}

                                    {statusPublications.length === 0 && (
                                        <p className="text-sm text-gray-400 text-center py-6">
                                            No hay publicaciones
                                        </p>
                                    )}

                                </div>
                            </div>
                        );
                    })}

                </div>
            </section>

        </main>
    );
}