export type Publication = {
    id: number;
    client_id: number;
    delivery_date: string | null;
    clients: {
        name: string;
    } | null;
    formats: {
        name: string;
    } | null;
    statuses: {
        name: string;
    } | null;
}