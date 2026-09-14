import { Publication } from "../types/Publication";
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";
import { toTitleCase } from "@/utils/functions/titleCase";

type ColumnProps = {
    status: string;
    status_id: number;
    accent: string;
    publications: Publication[];
};

export default function Column({ status, status_id, accent, publications }: ColumnProps) {
    // El id de este droppable es el status_id real de la BD.
    // Es el mismo valor que vamos a leer en onDragEnd (event.over.id)
    // y el mismo que vamos a mandar en el UPDATE a Supabase.
    const { setNodeRef, isOver } = useDroppable({ id: status_id });

    return (
        <div className="flex w-72 flex-shrink-0 flex-col">
            <div
                className="flex items-baseline gap-2 border-b-2 pb-3"
                style={{ borderColor: accent }}
            >
                <h2 className="text-[15px] text-[#1B1A17]">
                    {toTitleCase(status)}
                </h2>
                <span className="ml-auto text-[11px] text-[#8C8570]">
                    {publications.length}
                </span>
            </div>

            {/* setNodeRef marca este div como la zona receptora de la columna.
                isOver nos dice si ahora mismo hay algo arrastrándose por encima,
                lo usamos solo para dar feedback visual (fondo sutil). */}
            <div
                ref={setNodeRef}
                className={`flex flex-col min-h-[80px] transition-colors ${
                    isOver ? "bg-[#F3F2E9]" : ""
                }`}
            >
                {publications.length === 0 ? (
                    <p className="py-8 text-center text-[12px] text-[#B3AEA3]">
                        Sin publicaciones
                    </p>
                ) : (
                    publications.map((pub) => (
                        <Card
                            key={pub.id}
                            id={pub.id}
                            clients={pub.clients}
                            formats={pub.formats}
                            delivery_date={pub.delivery_date}
                        />
                    ))
                )}
            </div>
        </div>
    );
}