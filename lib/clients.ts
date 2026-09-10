import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function getClients() {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from("clients")
        .select("id, name")
        .order("name");

    if (error) {
        throw new Error(error.message);
    }

    return data;
}