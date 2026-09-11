import { Publication } from "../types/Publication";
import Column from "./Column";

type BoardProps = {
    publications: Publication[];
};

const STATUSES = [
    { name: "FALTA", accent: "#B7B2A6" },
    { name: "EN PRODUCCION", accent: "#ABA07E" },
    { name: "REVISION INTERNA", accent: "#B79C63" },
    { name: "REVISION CLIENTE", accent: "#C0A25C" },
    { name: "APROBADO", accent: "#C7A94E" },
    { name: "PROGRAMADO", accent: "#C9A93E" },
    { name: "PUBLICADO", accent: "#B08D2E" },
];

export default function Board({ publications }: BoardProps) {
    return (
        <div className="flex gap-8 overflow-x-auto bg-[#F6F5F2] p-8">
            {STATUSES.map(({ name, accent }) => (
                <Column
                    key={name}
                    status={name}
                    accent={accent}
                    publications={publications.filter(
                        (pub) => pub.statuses?.name === name
                    )}
                />
            ))}
        </div>
    );
}