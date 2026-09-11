"use client";

import { useState } from "react";
import { Publication } from "../types/Publication";
import Board from "./Board";
import ListboxMenu from "./Listbox";

type Client = {
    id: number;
    name: string;
};

type DashboardProps = {
    clients: Client[];
    publications: Publication[];
};

export default function Dashboard({ clients, publications }: DashboardProps) {
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

    const filteredPublications = selectedClientId
        ? publications.filter((pub) => pub.client_id === selectedClientId)
        : publications;

    return (
        <>
            {/* Header */}
            <section className="bg-[#F6F5F2] w-full flex justify-start">
                <div className="px-6 py-5">
                    <ListboxMenu clients={clients} onSelect={setSelectedClientId} />
                </div>
            </section>

            {/* Kanban */}
            <section className="bg-[#FAFAFA]">
                <Board publications={filteredPublications} />
            </section>
        </>
    );
}