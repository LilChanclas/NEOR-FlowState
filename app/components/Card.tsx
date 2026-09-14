import { toTitleCase } from "@/utils/functions/titleCase";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Publication } from "../types/Publication";

interface CardProps {
    publication: Publication;
    onClick: (publication: Publication) => void;
}

function formatDate(value: string | null) {
    if (!value) return null;
    return new Date(`${value}T00:00:00`).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
    });
}

export default function Card({ publication, onClick }: CardProps) {
    const { id, delivery_date, clients, formats } = publication;
    const date = formatDate(delivery_date);

    // useDraggable identifica esta card con el id de la publicación.
    // Ese mismo id es el que vamos a leer en onDragEnd (event.active.id).
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({ id });

    // Mientras se arrastra, dnd-kit no mueve el nodo real: nos da un
    // desplazamiento (x, y) y nosotros lo traducimos a CSS transform.
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() => onClick(publication)}
            className={`border-b border-[#E4E1DA] py-3 last:border-none cursor-grab active:cursor-grabbing ${
                isDragging ? "opacity-40" : ""
            }`}
        >
            {/* Nombre del cliente */}
            <p className="text-[15px] leading-snug text-[#1B1A17]">
                {toTitleCase(clients?.name) ?? "Sin cliente"}
            </p>

            <div className="mt-2 flex items-center justify-between">
                {/* tipo de formato */}
                <span className="rounded-full border border-[#E4E1DA] px-2 py-0.5 text-[11px] text-[#8C8570]">
                    {formats?.name ?? "—"}
                </span>

                {/* Fecha de entrega */}
                <span
                    className={`text-[12px] ${
                        date ? "text-[#726C60]" : "text-[#B3AEA3]"
                    }`}
                >
                    {date ?? "Sin fecha"}
                </span>
            </div>
        </div>
    );
}