import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MockBanner } from "../_components/mock-banner";
import { deletePayment, upsertPayment } from "./actions";

const fallbackPayments = [
  {
    client: "Oscar Barboza",
    email: "obarboza+cliente@cyborgdev.io",
    coach: "Claudia Alonso",
    amount: "$599.99 MXN",
    date: "12/11/2025",
    method: "Transferencia",
  },
  {
    client: "Oscar Barboza",
    email: "obarboza@runnercoach.test",
    coach: "Claudia Hernández",
    amount: "$650.00 MXN",
    date: "12/11/2025",
    method: "Transferencia",
  },
  {
    client: "Miguel Ortiz",
    email: "miguel.ortiz@runnercoach.test",
    coach: "Claudia Hernández",
    amount: "$1,199.99 MXN",
    date: "12/11/2025",
    method: "Transferencia",
  },
];

async function getPayments() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("payments")
      .select(
        "id,amount,currency,method,status,paid_at,client:clients(profile:profiles(name,email)),coach:coaches(profile:profiles(name))"
      )
      .order("paid_at", { ascending: false });
    if (error) throw error;
    const mapped =
      data?.map((p) => ({
        id: p.id,
        client: p.client?.profile?.name ?? "Sin nombre",
        email: p.client?.profile?.email ?? "—",
        coach: p.coach?.profile?.name ?? "Sin coach",
        amount: `$${Number(p.amount || 0).toFixed(2)} ${p.currency ?? "MXN"}`,
        date: p.paid_at?.slice(0, 10) ?? "",
        method: p.method ?? "—",
      })) ?? [];
    const total = data?.filter((p) => p.status === "pagado").reduce((acc, p) => acc + Number(p.amount || 0), 0) ?? 0;
    const pending = data?.filter((p) => p.status !== "pagado").reduce((acc, p) => acc + Number(p.amount || 0), 0) ?? 0;
    return { items: mapped, usingMock: false, totals: { total, pending } };
  } catch {
    return {
      items: fallbackPayments.map((p) => ({ ...p, id: "" })),
      usingMock: true,
      totals: { total: 20320.98, pending: 599.99 },
    };
  }
}

export default async function PaymentsPage() {
  const { items: clientPayments, usingMock, totals } = await getPayments();
  return (
    <div className="space-y-6">
      <MockBanner show={usingMock} />
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Pagos</p>
        <h2 className="text-2xl font-semibold">
          Aprueba pagos de clientes y gestiona pagos a coaches
        </h2>
      </div>

      <PaymentForm />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-100 shadow-lg shadow-emerald-500/20">
          <p className="text-sm">Total Recaudado</p>
          <p className="text-2xl font-semibold">
            ${totals.total.toFixed(2)} MXN
          </p>
        </div>
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-amber-100 shadow-lg shadow-amber-500/20">
          <p className="text-sm">Pagos Pendientes</p>
          <p className="text-2xl font-semibold">
            ${totals.pending.toFixed(2)} MXN
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-lg shadow-black/20">
        <table className="min-w-full text-sm">
          <thead className="bg-base/70 text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Coach</th>
              <th className="px-4 py-3 text-left">Monto</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Método</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientPayments.map((tx, idx) => (
              <tr
                key={tx.id ?? `${tx.client}-${idx}`}
                className={idx % 2 === 0 ? "bg-base/40" : "bg-base/20"}
              >
                <td className="px-4 py-3">
                  <div className="font-semibold text-base-foreground">{tx.client}</div>
                  <div className="text-xs text-muted">{tx.email}</div>
                </td>
                <td className="px-4 py-3 text-muted">{tx.coach}</td>
                <td className="px-4 py-3 text-emerald-300">{tx.amount}</td>
                <td className="px-4 py-3 text-muted">{tx.date}</td>
                <td className="px-4 py-3 text-muted">{tx.method}</td>
                <td className="px-4 py-3 text-primary">
                  {tx.id ? (
                    <form action={deletePayment.bind(null, tx.id)}>
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

function PaymentForm() {
  return (
    <form
      action={upsertPayment}
      className="grid gap-3 rounded-2xl border border-border bg-base/70 p-4 text-sm md:grid-cols-3"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Client ID (UUID)</label>
        <input
          name="client_id"
          required
          placeholder="UUID de cliente"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Coach ID (opcional)</label>
        <input
          name="coach_id"
          placeholder="UUID de coach"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Monto</label>
        <input
          name="amount"
          required
          type="number"
          step="0.01"
          placeholder="599.99"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Moneda</label>
        <input
          name="currency"
          defaultValue="MXN"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Método</label>
        <input
          name="method"
          defaultValue="transferencia"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Estado</label>
        <select
          name="status"
          defaultValue="pagado"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        >
          <option value="pagado">Pagado</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Fecha de pago</label>
        <input
          name="paid_at"
          type="date"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
      >
        Guardar pago
      </button>
    </form>
  );
}

