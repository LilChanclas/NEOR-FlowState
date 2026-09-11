import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Publication } from "@/app/types/Publication";

export async function getPublications(): Promise<Publication[]> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from("publications")
        .select(`
            id,
            client_id,
            delivery_date,
            clients(name),
            formats(name),
            statuses(name)
        `);

    if (error) {
        throw new Error(error.message);
    }

    return data as unknown as Publication[];
}