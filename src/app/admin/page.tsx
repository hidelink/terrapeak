import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MockBanner } from "./_components/mock-banner";

const fallbackCoachMetrics = [
  { label: "Coaches Totales", value: "150", tone: "default" },
  { label: "Coaches Aprobados", value: "138", tone: "positive" },
  { label: "Coaches Pendientes", value: "12", tone: "warning" },
];

const fallbackClientMetrics = [
  { label: "Clientes Totales", value: "2,500", tone: "default" },
  { label: "Clientes sin Coach", value: "180", tone: "warning" },
  { label: "Ingresos Totales", value: "$20,320.98 MXN", tone: "positive" },
];

const fallbackAlerts = [
  { label: "Pagos Pendientes", value: "$599.99 MXN", tone: "warning" },
  { label: "Revisión de Eventos", value: "3 pendientes", tone: "accent" },
];

const quickActions = [
  { label: "Gestionar Coaches", href: "/admin/coaches" },
  { label: "Gestionar Clientes", href: "/admin/clients" },
  { label: "Gestionar Pagos", href: "/admin/payments" },
];

const toneClasses: Record<string, string> = {
  default: "text-base-foreground",
  positive: "text-emerald-400",
  warning: "text-amber-300",
  accent: "text-primary",
};

type DashboardData = {
  coachMetrics: typeof fallbackCoachMetrics;
  clientMetrics: typeof fallbackClientMetrics;
  alerts: typeof fallbackAlerts;
  usingMock: boolean;
};

async function getDashboardData(): Promise<DashboardData> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data: coaches, error: coachesError } = await supabase
      .from("coaches")
      .select("id,status");
    if (coachesError) throw coachesError;

    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select("id,coach_id");
    if (clientsError) throw clientsError;

    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("amount,status,currency");
    if (paymentsError) throw paymentsError;

    const totalCoaches = coaches?.length ?? 0;
    const approvedCoaches = coaches?.filter((c) => c.status === "aprobado").length ?? 0;
    const pendingCoaches = totalCoaches - approvedCoaches;

    const totalClients = clients?.length ?? 0;
    const clientsWithoutCoach =
      clients?.filter((c) => c.coach_id === null).length ?? 0;

    const totalIncome =
      payments
        ?.filter((p) => p.status === "pagado")
        .reduce((acc, p) => acc + Number(p.amount || 0), 0) ?? 0;
    const pendingIncome =
      payments
        ?.filter((p) => p.status !== "pagado")
        .reduce((acc, p) => acc + Number(p.amount || 0), 0) ?? 0;

    return {
      usingMock: false,
      coachMetrics: [
        { label: "Coaches Totales", value: `${totalCoaches}`, tone: "default" },
        { label: "Coaches Aprobados", value: `${approvedCoaches}`, tone: "positive" },
        { label: "Coaches Pendientes", value: `${pendingCoaches}`, tone: "warning" },
      ],
      clientMetrics: [
        { label: "Clientes Totales", value: `${totalClients}`, tone: "default" },
        { label: "Clientes sin Coach", value: `${clientsWithoutCoach}`, tone: "warning" },
        {
          label: "Ingresos Totales",
          value: `$${totalIncome.toFixed(2)} MXN`,
          tone: "positive",
        },
      ],
      alerts: [
        {
          label: "Pagos Pendientes",
          value: `$${pendingIncome.toFixed(2)} MXN`,
          tone: "warning",
        },
      ],
    };
  } catch {
    return {
      usingMock: true,
      coachMetrics: fallbackCoachMetrics,
      clientMetrics: fallbackClientMetrics,
      alerts: fallbackAlerts,
    };
  }
}

export default async function AdminHomePage() {
  const { usingMock, coachMetrics, clientMetrics, alerts } = await getDashboardData();
  return (
    <div className="space-y-8">
      <MockBanner show={usingMock} />
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Panel de Administración
        </p>
        <h2 className="text-2xl font-semibold">
          Gestiona coaches, clientes, pagos y eventos
        </h2>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {coachMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-border bg-surface/80 p-4 shadow-lg shadow-black/20"
          >
            <p className="text-sm text-muted">{metric.label}</p>
            <p className={`mt-2 text-2xl font-semibold ${toneClasses[metric.tone]}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {clientMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-border bg-surface/80 p-4 shadow-lg shadow-black/20"
          >
            <p className="text-sm text-muted">{metric.label}</p>
            <p className={`mt-2 text-2xl font-semibold ${toneClasses[metric.tone]}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-border bg-base/70 p-5 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold">Accesos rápidos</h3>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {quickActions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="rounded-full border border-border px-4 py-2 font-semibold text-base-foreground transition hover:border-primary/60 hover:text-primary"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 text-amber-100 shadow-lg shadow-amber-500/20">
          <h3 className="text-lg font-semibold">Alertas</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {alerts.map((alert) => (
              <li key={alert.label} className="flex items-center justify-between">
                <span>{alert.label}</span>
                <span className="font-semibold">{alert.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

