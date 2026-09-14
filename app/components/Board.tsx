import { Publication } from "../types/Publication";
import Column from "./Column";

type BoardProps = {
    publications: Publication[];
    onCardClick: (publication: Publication) => void;
};

// El color avanza de gris neutro a dorado a medida que la publicación
// se acerca a "Publicado" — comunica progreso, no solo decora.
const STATUSES = [
    { status_id: 1, name: "FALTA", accent: "#B7B2A6" },
    { status_id: 2, name: "EN PRODUCCION", accent: "#ABA07E" },
    { status_id: 3, name: "REVISION INTERNA", accent: "#B79C63" },
    { status_id: 4, name: "REVISION CLIENTE", accent: "#C0A25C" },
    { status_id: 5, name: "APROBADO", accent: "#C7A94E" },
    { status_id: 6, name: "PROGRAMADO", accent: "#C9A93E" },
    { status_id: 7, name: "PUBLICADO", accent: "#B08D2E" },
];

export default function Board({ publications, onCardClick }: BoardProps) {
    return (
        <div className="flex gap-8 overflow-x-auto bg-[#F6F5F2] p-8">
            {STATUSES.map(({ status_id, name, accent }) => (
                <Column
                    key={status_id}
                    status_id={status_id}
                    status={name}
                    accent={accent}
                    publications={publications.filter(
                        (pub) => pub.statuses?.name === name
                    )}
                    onCardClick={onCardClick}
                />
            ))}
        </div>
    );
}