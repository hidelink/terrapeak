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
        const getFn = (cookieStore as unknown as { get?: CallableFunction }).get;
        if (typeof getFn !== "function") return undefined;
        return getFn.call(cookieStore, name)?.value;
      },
      set(name, value, options) {
        const setFn = (cookieStore as unknown as { set?: CallableFunction }).set;
        if (typeof setFn !== "function") return;
        try {
          setFn.call(cookieStore, name, value, options as CookieOptions);
        } catch {
          // In middleware/edge, cookies might be readonly; ignore.
        }
      },
      remove(name, options) {
        const setFn = (cookieStore as unknown as { set?: CallableFunction }).set;
        if (typeof setFn !== "function") return;
        try {
          setFn.call(cookieStore, name, "", {
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

