"use client";

import { useState } from "react";
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { createClient } from "@/utils/supabase/client";
import { Publication } from "../types/Publication";
import Board from "./Board";
import ListboxMenu from "./Listbox";
import PublicationModal from "./PublicationModal";

type Client = {
    id: number;
    name: string;
};

type DashboardProps = {
    clients: Client[];
    publications: Publication[];
};

// Mismo mapa de status_id -> nombre que usa Board para pintar columnas.
// Lo necesitamos acá para poder actualizar el estado local con el nombre
// correcto (no solo el id) cuando movemos una card.
const STATUS_NAMES: Record<number, string> = {
    1: "FALTA",
    2: "EN PRODUCCION",
    3: "REVISION INTERNA",
    4: "REVISION CLIENTE",
    5: "APROBADO",
    6: "PROGRAMADO",
    7: "PUBLICADO",
};

export default function Dashboard({ clients, publications: initialPublications }: DashboardProps) {
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [publications, setPublications] = useState<Publication[]>(initialPublications);

    // Cuál publicación está abierta en el modal ahora mismo. null = modal cerrado.
    const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

    // Sin esto, el click para abrir el modal sería interceptado por dnd-kit
    // como el inicio de un drag (mousedown/mouseup son técnicamente un drag
    // de distancia 0). Con activationConstraint, dnd-kit espera a que el
    // mouse se mueva más de 8px antes de considerar que hay un arrastre real.
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    const filteredPublications = selectedClientId
        ? publications.filter((pub) => pub.client_id === selectedClientId)
        : publications;

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        // Si soltó fuera de cualquier columna, no hacemos nada.
        if (!over) return;

        const publicationId = active.id as number;
        const newStatusId = over.id as number;

        const publication = publications.find((pub) => pub.id === publicationId);
        if (!publication) return;

        // Si lo soltó en la misma columna en la que ya estaba, no hay nada que hacer.
        if (publication.status_id === newStatusId) return;

        // 1. Snapshot: guardamos cómo estaba todo antes de mover nada,
        //    por si el update a Supabase falla y necesitamos volver atrás.
        const previousPublications = publications;

        // 2. Optimistic update: movemos la card en pantalla ya mismo.
        setPublications((current) =>
            current.map((pub) =>
                pub.id === publicationId
                    ? {
                          ...pub,
                          status_id: newStatusId,
                          statuses: { name: STATUS_NAMES[newStatusId] ?? pub.statuses?.name ?? "" },
                      }
                    : pub
            )
        );

        // 3. Persistimos en Supabase.
        const supabase = createClient();
        const { error } = await supabase
            .from("publications")
            .update({ status_id: newStatusId })
            .eq("id", publicationId);

        // 4. Si falla, rollback: la BD es la fuente de verdad.
        if (error) {
            console.error("No se pudo actualizar el status:", error.message);
            setPublications(previousPublications);
            alert("No se pudo guardar el cambio. Intentá de nuevo.");
        }
    }

    // Edit desde el modal. Recibe solo los campos editables + el id.
    async function handleUpdatePublication(
        publicationId: number,
        changes: Partial<
            Pick<
                Publication,
                "delivery_date" | "publication_date" | "topic" | "copy" | "caption" | "is_story"
            >
        >
    ) {
        const previousPublications = publications;

        // Optimistic update.
        setPublications((current) =>
            current.map((pub) =>
                pub.id === publicationId ? { ...pub, ...changes } : pub
            )
        );

        const supabase = createClient();
        const { error } = await supabase
            .from("publications")
            .update(changes)
            .eq("id", publicationId);

        if (error) {
            console.error("No se pudo guardar la publicación:", error.message);
            setPublications(previousPublications);
            alert("No se pudo guardar el cambio. Intentá de nuevo.");
            return;
        }

        // Éxito: cerramos el modal.
        setSelectedPublication(null);
    }

    // Delete desde el modal.
    async function handleDeletePublication(publicationId: number) {
        const confirmed = window.confirm(
            "¿Seguro que querés eliminar esta publicación? Esta acción no se puede deshacer."
        );
        if (!confirmed) return;

        const previousPublications = publications;

        // Optimistic update: la sacamos del array ya mismo.
        setPublications((current) => current.filter((pub) => pub.id !== publicationId));
        setSelectedPublication(null);

        const supabase = createClient();
        const { error } = await supabase
            .from("publications")
            .delete()
            .eq("id", publicationId);

        if (error) {
            console.error("No se pudo eliminar la publicación:", error.message);
            setPublications(previousPublications);
            alert("No se pudo eliminar la publicación. Intentá de nuevo.");
        }
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {/* Header */}
            <section className="bg-[#F6F5F2] w-full flex justify-start">
                <div className="px-6 py-5">
                    <ListboxMenu clients={clients} onSelect={setSelectedClientId} />
                </div>
            </section>

            {/* Kanban */}
            <section className="bg-[#FAFAFA]">
                <Board
                    publications={filteredPublications}
                    onCardClick={setSelectedPublication}
                />
            </section>

            {selectedPublication && (
                <PublicationModal
                    publication={selectedPublication}
                    onClose={() => setSelectedPublication(null)}
                    onSave={handleUpdatePublication}
                    onDelete={handleDeletePublication}
                />
            )}
        </DndContext>
    );
}