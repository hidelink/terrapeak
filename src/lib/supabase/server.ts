import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const getSupabaseKeys = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno."
    );
  }

  return { url, anonKey };
};

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseKeys();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        try {
          cookieStore.set(name, value, options as CookieOptions);
        } catch {
          // In middleware/edge, cookies might be readonly; ignore.
        }
      },
      remove(name, options) {
        try {
          cookieStore.set(name, "", {
            ...(options as CookieOptions),
            maxAge: 0,
          });
        } catch {
          // Ignore if cookies are readonly.
        }
      },
    },
  });
};

