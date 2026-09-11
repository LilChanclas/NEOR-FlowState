import { toTitleCase } from "@/utils/functions/titleCase";

interface CardProps {
    id: number;
    delivery_date: string | null;
    clients: {
        name: string;
    } | null;
    formats: {
        name: string;
    } | null;
}

function formatDate(value: string | null) {
    if (!value) return null;
    return new Date(`${value}T00:00:00`).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
    });
}

export default function Card({ delivery_date, clients, formats }: CardProps) {
    const date = formatDate(delivery_date);

    return (
        <div className="border-b border-[#E4E1DA] py-3 last:border-none">
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
                    Se entrega el: {date ?? "Sin fecha"}
                </span>
            </div>
        </div>
    );
}