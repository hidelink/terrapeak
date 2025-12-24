import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MockBanner } from "../_components/mock-banner";
import { deleteClient, upsertClient } from "./actions";

const fallbackClients = [
  {
    name: "obarboza+cliente",
    email: "obarboza+cliente@cyborgdev.io",
    coach: "Claudia Alonso",
    plan: "Plan Equipo",
    status: "✓",
  },
  {
    name: "Sara Ortiz",
    email: "sara.ortiz18@runnercoach.test",
    coach: "Claudia Alonso",
    plan: "Sin plan",
    status: "✓",
  },
  {
    name: "David Álvarez",
    email: "david.alvarez16@runnercoach.test",
    coach: "Carmen Pérez",
    plan: "Sin plan",
    status: "✓",
  },
];

type SelectOption = { id: string; label: string };

type ClientRow = {
  id?: string;
  status?: string | null;
  profile?: { name?: string | null; email?: string | null } | null;
  coach?: { profile?: { name?: string | null } | null } | null;
  plan?: { name?: string | null } | null;
};

async function getClients() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("clients")
      .select(
        "id,status,profile:profiles(name,email),coach:coaches(profile:profiles(name)),plan:plans(name)"
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    const mapped =
      ((data ?? []) as ClientRow[]).map((c) => ({
        id: c.id ?? "",
        name: c.profile?.name ?? "Sin nombre",
        email: c.profile?.email ?? "—",
        coach: c.coach?.profile?.name ?? "Sin coach",
        plan: c.plan?.name ?? "Sin plan",
        status: "✓",
      })) ?? [];
    return { items: mapped, usingMock: false };
  } catch {
    return {
      items: fallbackClients.map((c) => ({ ...c, id: "" })),
      usingMock: true,
    };
  }
}

async function getClientFormData() {
  try {
    const supabase = await createSupabaseServerClient();

    const [{ data: coaches }, { data: plans }] = await Promise.all([
      supabase
        .from("coaches")
        .select("id,profile:profiles(name,email)")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase.from("plans").select("id,name").order("created_at", { ascending: false }).limit(100),
    ]);

    return {
      coaches:
        coaches?.map((c) => ({
          id: c.id,
          label: `${c.profile?.name ?? "Sin nombre"} · ${c.profile?.email ?? "—"}`,
        })) ?? [],
      plans:
        plans?.map((p) => ({
          id: p.id,
          label: p.name,
        })) ?? [],
      usingMock: false,
    };
  } catch {
    return { coaches: [], plans: [], usingMock: true };
  }
}

export default async function ClientsPage() {
  const { items: clients, usingMock } = await getClients();
  const formData = await getClientFormData();
  const clientOptions = clients
    .filter((c) => c.id)
    .map((c) => ({
      id: c.id as string,
      label: `${c.name} · ${c.email ?? ""}`.trim(),
    }));
  return (
    <div className="space-y-6">
      <MockBanner show={usingMock || formData.usingMock} />
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Clientes
        </p>
        <h2 className="text-2xl font-semibold">
          Asigna clientes a coaches y gestiona sus relaciones
        </h2>
      </div>

      <ClientForm
        coaches={formData.coaches}
        plans={formData.plans}
        clients={clientOptions as { id: string; label: string }[]}
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-lg shadow-black/20">
        <table className="min-w-full text-sm">
          <thead className="bg-base/70 text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Coach Asignado</th>
              <th className="px-4 py-3 text-left">Plan Activo</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, idx) => (
              <tr
                key={client.id ?? client.email}
                className={idx % 2 === 0 ? "bg-base/40" : "bg-base/20"}
              >
                <td className="px-4 py-3 font-semibold text-base-foreground">
                  {client.name}
                </td>
                <td className="px-4 py-3 text-muted">{client.email}</td>
                <td className="px-4 py-3 text-muted">{client.coach}</td>
                <td className="px-4 py-3 text-muted">{client.plan}</td>
                <td className="px-4 py-3 text-primary">{client.status}</td>
                <td className="px-4 py-3 text-primary">
                  {client.id ? (
                    <form action={deleteClient.bind(null, client.id)}>
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

function ClientForm({
  coaches,
  plans,
  clients,
}: {
  coaches: SelectOption[];
  plans: SelectOption[];
  clients: SelectOption[];
}) {
  return (
    <form
      action={upsertClient}
      className="grid gap-3 rounded-2xl border border-border bg-base/70 p-4 text-sm md:grid-cols-3"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Cliente existente (para editar)</label>
        <select
          name="id"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          defaultValue=""
        >
          <option value="">Nuevo cliente</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label ?? c.id}
            </option>
          ))}
        </select>
        <p className="text-[11px] text-muted">
          Deja en "Nuevo cliente" para crear; selecciona uno para asignarle coach/plan.
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Coach</label>
        <select
          name="coach_id"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          defaultValue=""
        >
          <option value="">Sin coach</option>
          {coaches.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Plan</label>
        <select
          name="plan_id"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          defaultValue=""
        >
          <option value="">Sin plan</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Estado</label>
        <select
          name="status"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          defaultValue="activo"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
      >
        Guardar cliente
      </button>
    </form>
  );
}

