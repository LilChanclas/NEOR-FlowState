"use client";

import { useState } from "react";
import { Publication } from "../types/Publication";

type EditableFields = Pick<
    Publication,
    "delivery_date" | "publication_date" | "topic" | "copy" | "caption" | "is_story"
>;

type PublicationModalProps = {
    publication: Publication;
    onClose: () => void;
    onSave: (publicationId: number, changes: Partial<EditableFields>) => Promise<void>;
    onDelete: (publicationId: number) => Promise<void>;
};

export default function PublicationModal({
    publication,
    onClose,
    onSave,
    onDelete,
}: PublicationModalProps) {
    // Estado local del formulario: no toca Dashboard hasta que se guarda.
    const [deliveryDate, setDeliveryDate] = useState(publication.delivery_date ?? "");
    const [publicationDate, setPublicationDate] = useState(publication.publication_date ?? "");
    const [topic, setTopic] = useState(publication.topic ?? "");
    const [copy, setCopy] = useState(publication.copy ?? "");
    const [caption, setCaption] = useState(publication.caption ?? "");
    const [isStory, setIsStory] = useState(publication.is_story);
    const [isSaving, setIsSaving] = useState(false);

    async function handleSaveClick() {
        setIsSaving(true);
        await onSave(publication.id, {
            delivery_date: deliveryDate || null,
            publication_date: publicationDate || null,
            topic: topic || null || undefined,
            copy: copy || null,
            caption: caption || null,
            is_story: isStory,
        });
        setIsSaving(false);
    }

    return (
        // Fondo oscuro semitransparente. Click afuera del modal lo cierra.
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            {/* stopPropagation: evita que un click DENTRO del modal
                se propague al fondo y lo cierre por accidente. */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
            >
                {/* Encabezado: datos que NO se editan acá (cliente, formato) */}
                <div className="mb-4 border-b border-[#E4E1DA] pb-4">
                    <p className="font-serif text-lg text-[#1B1A17]">
                        {publication.clients?.name ?? "Sin cliente"}
                    </p>
                    <p className="text-[12px] text-[#8C8570]">
                        Formato: {publication.formats?.name ?? "—"}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1 text-[12px] text-[#726C60]">
                            Fecha de entrega
                            <input
                                type="date"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                className="rounded-md border border-[#E4E1DA] px-2 py-1.5 text-[13px] text-[#1B1A17]"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-[12px] text-[#726C60]">
                            Fecha de publicación
                            <input
                                type="date"
                                value={publicationDate}
                                onChange={(e) => setPublicationDate(e.target.value)}
                                className="rounded-md border border-[#E4E1DA] px-2 py-1.5 text-[13px] text-[#1B1A17]"
                            />
                        </label>
                    </div>

                    <label className="flex flex-col gap-1 text-[12px] text-[#726C60]">
                        Topic
                        <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            rows={2}
                            className="rounded-md border border-[#E4E1DA] px-2 py-1.5 text-[13px] text-[#1B1A17]"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-[12px] text-[#726C60]">
                        Copy
                        <textarea
                            value={copy}
                            onChange={(e) => setCopy(e.target.value)}
                            rows={3}
                            className="rounded-md border border-[#E4E1DA] px-2 py-1.5 text-[13px] text-[#1B1A17]"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-[12px] text-[#726C60]">
                        Caption
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            rows={2}
                            className="rounded-md border border-[#E4E1DA] px-2 py-1.5 text-[13px] text-[#1B1A17]"
                        />
                    </label>

                    <label className="flex items-center gap-2 text-[13px] text-[#1B1A17]">
                        <input
                            type="checkbox"
                            checked={isStory}
                            onChange={(e) => setIsStory(e.target.checked)}
                            className="h-4 w-4"
                        />
                        Es historia
                    </label>
                </div>

                {/* Acciones */}
                <div className="mt-6 flex items-center justify-between border-t border-[#E4E1DA] pt-4">
                    <button
                        onClick={() => onDelete(publication.id)}
                        className="text-[13px] font-medium text-red-600 hover:text-red-700"
                    >
                        Eliminar
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="rounded-md border border-[#E4E1DA] px-4 py-2 text-[13px] text-[#4A4A4A]"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveClick}
                            disabled={isSaving}
                            className="rounded-md bg-[#1B1A17] px-4 py-2 text-[13px] font-medium text-white disabled:opacity-50"
                        >
                            {isSaving ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}