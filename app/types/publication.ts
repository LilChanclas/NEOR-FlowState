export type Publication = {
    id: number;
    client_id: number;
    status_id: number;
    publication_number: number | null;
    delivery_date: string | null;
    publication_date: string | null;
    topic: string;
    copy: string | null;
    caption: string | null;
    is_story: boolean;
    clients: {
        name: string;
    } | null;
    formats: {
        name: string;
    } | null;
    statuses: {
        name: string;
    } | null;
};