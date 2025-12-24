import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SidebarNav } from "./_components/sidebar-nav";

const signOutAction = async () => {
  "use server";
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-base text-base-foreground">
      <div className="flex">
        <SidebarNav userEmail={user.email} />
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border/60 bg-base/80 px-4 py-4 md:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                Panel Terra Peak
              </p>
              <h1 className="text-xl font-semibold">Administración</h1>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/"
                className="hidden rounded-full border border-border px-4 py-2 font-semibold text-muted transition hover:border-primary/60 hover:text-primary md:inline-flex"
              >
                Ver landing
              </Link>
              <form action={signOutAction}>
                <button className="rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary transition hover:bg-primary/20">
                  Cerrar sesión
                </button>
              </form>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

