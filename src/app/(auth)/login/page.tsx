import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const loginAction = async (formData: FormData) => {
  "use server";

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/login?error=Email%20y%20contrase%C3%B1a%20requeridos");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const message = encodeURIComponent(error.message);
    redirect(`/login?error=${message}`);
  }

  redirect("/admin");
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage(props: LoginPageProps) {
  const searchParams = await props.searchParams;
  const errorMessage = searchParams?.error;

  return (
    <div className="min-h-screen bg-base text-base-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,102,51,0.08),transparent_42%),radial-gradient(circle_at_20%_30%,rgba(241,164,41,0.08),transparent_30%)]" />
      <div className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-12 md:px-6">
        <div className="grid w-full gap-10 rounded-3xl border border-border bg-surface/80 p-8 shadow-xl shadow-black/30 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  Terra Peak
                </span>
                <span className="text-lg font-semibold">RunnerCoach</span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
              <p className="text-muted">
                Ingresa a tu cuenta para gestionar tus clientes y eventos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-muted">
              <div className="rounded-2xl border border-border/60 bg-base/70 p-4">
                <p className="text-xs uppercase tracking-wide">Coaches</p>
                <p className="text-lg font-semibold text-primary">150+</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-base/70 p-4">
                <p className="text-xs uppercase tracking-wide">Runners activos</p>
                <p className="text-lg font-semibold text-accent">2,500+</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-base/70 p-6">
            {errorMessage ? (
              <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {decodeURIComponent(errorMessage)}
              </div>
            ) : null}
            <form action={loginAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-primary focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-primary focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
              >
                Iniciar sesión
              </button>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
                <span className="h-px w-full bg-border" />
                o
                <span className="h-px w-full bg-border" />
              </div>
              <button
                type="button"
                className="w-full rounded-full border border-border px-5 py-3 text-sm font-semibold text-base-foreground transition hover:border-primary/60 hover:text-primary"
                aria-disabled
                title="Configura el provider de Google en Supabase para habilitar"
              >
                Continuar con Google
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-muted">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

