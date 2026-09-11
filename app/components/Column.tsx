import { Publication } from "../types/Publication";
import Card from "./Card";
import { toTitleCase } from "@/utils/functions/titleCase";

type ColumnProps = {
    status: string;
    accent: string;
    publications: Publication[];
};

export default function Column({ status, accent, publications }: ColumnProps) {
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

            <div className="flex flex-col">
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