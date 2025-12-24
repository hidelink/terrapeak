import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MockBanner } from "../_components/mock-banner";
import { deleteCoach, upsertCoach } from "./actions";

type CoachRow = {
  id?: string;
  status?: string | null;
  created_at?: string | null;
  profile?: { name?: string | null; email?: string | null } | { name?: string | null; email?: string | null }[];
};

const fallbackCoaches = [
  {
    name: "Claudia Alonso",
    email: "claudia.alonso@runnercoach.test",
    status: "Aprobado",
    date: "12/11/2025",
    actions: "Pagos · + Enlace",
  },
  {
    name: "Cristina López",
    email: "cristina.lopez@runnercoach.test",
    status: "Aprobado",
    date: "12/11/2025",
    actions: "Pagos · + Enlace",
  },
  {
    name: "Carmen Pérez",
    email: "carmen.perez@runnercoach.test",
    status: "Aprobado",
    date: "12/11/2025",
    actions: "Pagos · + Enlace",
  },
];

async function getCoaches() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("coaches")
      .select("id,status,created_at,profile:profiles(name,email)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    const mapped =
      ((data ?? []) as CoachRow[]).map((c) => {
        const prof = Array.isArray(c.profile) ? c.profile[0] : c.profile;
        return {
          id: c.id ?? "",
          name: prof?.name ?? "Sin nombre",
          email: prof?.email ?? "—",
          status: c.status ?? "Pendiente",
          date: c.created_at?.slice(0, 10) ?? "",
          actions: "Pagos · + Enlace",
        };
      }) ?? [];
    return { items: mapped, usingMock: false };
  } catch {
    return {
      items: fallbackCoaches.map((c) => ({ ...c, id: "" })),
      usingMock: true,
    };
  }
}

export default async function CoachesPage() {
  const { items: coaches, usingMock } = await getCoaches();
  return (
    <div className="space-y-6">
      <MockBanner show={usingMock} />
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Coaches
        </p>
        <h2 className="text-2xl font-semibold">
          Invita, aprueba y gestiona los coaches de la plataforma
        </h2>
      </div>

      <CoachForm />

      <div className="flex flex-wrap gap-3 text-sm">
        <input
          type="text"
          placeholder="Buscar coaches..."
          className="w-64 rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        <select className="rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30">
          <option>Todos</option>
          <option>Aprobados</option>
          <option>Pendientes</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-lg shadow-black/20">
        <table className="min-w-full text-sm">
          <thead className="bg-base/70 text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Fecha de Registro</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach, idx) => (
              <tr
                key={coach.id ?? coach.email}
                className={idx % 2 === 0 ? "bg-base/40" : "bg-base/20"}
              >
                <td className="px-4 py-3 font-semibold text-base-foreground">
                  {coach.name}
                </td>
                <td className="px-4 py-3 text-muted">{coach.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {coach.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{coach.date}</td>
                <td className="px-4 py-3 text-primary space-x-2">
                  {coach.id ? (
                    <form action={deleteCoach.bind(null, coach.id)} className="inline">
                      <button className="hover:underline">🗑️ Eliminar</button>
                    </form>
                  ) : (
                    <span className="text-muted">Mock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CoachForm() {
  return (
    <form
      action={upsertCoach}
      className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-base/70 p-4 text-sm"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Profile ID (UUID)</label>
        <input
          name="profile_id"
          required
          placeholder="UUID de profiles"
          className="w-56 rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Estado</label>
        <select
          name="status"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          defaultValue="aprobado"
        >
          <option value="aprobado">Aprobado</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
      >
        Guardar coach
      </button>
    </form>
  );
}

