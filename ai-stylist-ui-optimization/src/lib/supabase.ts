import { createClient, type Session, type User } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase environment variables are missing.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  email: string;
  display_name: string | null;
  role: "user" | "admin";
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function getProfile(user: User): Promise<Profile | null> {
  const { data } = await supabase.from("profiles").select("id, email, display_name, role, created_at, updated_at").eq("id", user.id).maybeSingle();
  return data as Profile | null;
}

export type AuthState = { session: Session | null; profile: Profile | null };
