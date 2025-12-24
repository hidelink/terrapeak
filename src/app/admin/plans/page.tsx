import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MockBanner } from "../_components/mock-banner";
import { deletePlan, upsertPlan } from "./actions";

type PlanRow = {
  id?: string;
  name?: string | null;
  price?: number | null;
  currency?: string | null;
  billing_period?: string | null;
  features?: any;
  is_featured?: boolean | null;
};

const fallbackPlans = [
  {
    name: "Plan Equipo",
    price: "$599.99 MXN/mes",
    features: [
      "Seguimiento mensual",
      "Plan de entrenamiento básico",
      "Acceso a eventos locales",
      "Soporte por email",
    ],
    cta: "Elegir plan",
    highlighted: false,
  },
  {
    name: "Plan Personalizado",
    price: "$1,199.99 MXN/mes",
    features: [
      "Seguimiento diario",
      "Plan ultra personalizado",
      "Acceso VIP a eventos exclusivos",
      "Soporte 24/7",
      "Análisis avanzado de rendimiento",
      "Consultas ilimitadas",
      "Sesiones de coaching en vivo",
      "Nutrición personalizada",
      "Preparación para competiciones",
    ],
    cta: "Empezar ahora",
    highlighted: true,
  },
];

async function getPlans() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("plans")
      .select("id,name,price,currency,billing_period,features,is_featured")
      .order("created_at", { ascending: true });
    if (error) throw error;
    const mapped =
      ((data ?? []) as PlanRow[]).map((p) => {
        const features = Array.isArray(p.features)
          ? p.features.filter((f): f is string => typeof f === "string")
          : [];
        return {
          id: p.id ?? "",
          name: p.name ?? "Sin nombre",
          price: `$${Number(p.price || 0).toFixed(2)} ${p.currency ?? "MXN"}/${p.billing_period ?? "mes"}`,
          features,
          cta: p.is_featured ? "Empezar ahora" : "Elegir plan",
          highlighted: Boolean(p.is_featured),
        };
      }) ?? [];
    return { items: mapped, usingMock: false };
  } catch {
    return {
      items: fallbackPlans.map((p) => ({ ...p, id: "" })),
      usingMock: true,
    };
  }
}

export default async function PlansPage() {
  const { items: plans, usingMock } = await getPlans();
  return (
    <div className="space-y-6">
      <MockBanner show={usingMock} />
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Planes</p>
        <h2 className="text-2xl font-semibold">
          Crea y gestiona los planes de suscripción disponibles
        </h2>
      </div>

      <PlanForm />

      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id ?? plan.name}
            className={`flex h-full flex-col rounded-3xl border border-border bg-surface/80 p-6 shadow-lg shadow-black/20 ${
              plan.highlighted ? "ring-2 ring-primary/60" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              {plan.highlighted ? (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Recomendado
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-lg font-semibold text-primary">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              <button
                className={`inline-flex w-fit rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
                    : "border border-border text-base-foreground hover:border-primary/60 hover:text-primary"
                }`}
              >
                {plan.cta}
              </button>
              {plan.id ? (
                <form action={deletePlan.bind(null, plan.id)}>
                  <button
                    type="submit"
                    className="rounded-full border border-border px-4 py-2 text-xs text-muted transition hover:border-primary/60 hover:text-primary"
                  >
                    Eliminar
                  </button>
                </form>
              ) : (
                <span className="text-xs text-muted">Mock</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanForm() {
  return (
    <form
      action={upsertPlan}
      className="grid gap-3 rounded-2xl border border-border bg-base/70 p-4 text-sm md:grid-cols-3"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Nombre</label>
        <input
          name="name"
          required
          placeholder="Plan Equipo"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Precio</label>
        <input
          name="price"
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
        <label className="text-xs text-muted">Periodo</label>
        <input
          name="billing_period"
          defaultValue="mensual"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-muted">Features (una por línea)</label>
        <textarea
          name="features"
          rows={2}
          placeholder="Seguimiento mensual&#10;Soporte por email"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-muted">
        <input type="checkbox" name="is_featured" className="h-4 w-4" /> Destacado
      </label>
      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
      >
        Guardar plan
      </button>
    </form>
  );
}

