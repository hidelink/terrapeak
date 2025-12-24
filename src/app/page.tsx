const stats = [
  { label: "Runners entrenando", value: "2,500+" },
  { label: "Coaches expertos", value: "150+" },
  { label: "Eventos", value: "500+" },
  { label: "Satisfacción", value: "98%" },
];

const benefits = [
  {
    title: "Mejora tus tiempos",
    description:
      "Entrenamientos personalizados que te llevan a romper tus marcas personales.",
    stat: "-12 min promedio en maratón",
    icon: "⏱️",
  },
  {
    title: "Prevén lesiones",
    description:
      "Técnicas y progresión adecuada para que corras más y te lesiones menos.",
    stat: "85% menos lesiones",
    icon: "🛡️",
  },
  {
    title: "Alcanza tus metas",
    description:
      "Desde tu primer 5K hasta tu primera ultra, un coach te guía en cada paso.",
    stat: "2,500+ metas alcanzadas",
    icon: "🎯",
  },
];

const testimonials = [
  {
    name: "María García",
    role: "Maratonista",
    goal: "Sub 3:30 Maratón",
    quote:
      "En 6 meses bajé 18 minutos mi tiempo en maratón. Mi coach entendió exactamente lo que necesitaba.",
  },
  {
    name: "Carlos Ruiz",
    role: "Trail Runner",
    goal: "Ultra Trail 50K",
    quote:
      "Pasé de no poder correr 10km a completar mi primer ultra de 50km. Increíble transformación.",
  },
  {
    name: "Ana Martínez",
    role: "Running Principiante",
    goal: "Primera Media Maratón",
    quote:
      "Nunca pensé que podría amar correr. Mi coach me enseñó a disfrutar cada kilómetro.",
  },
];

const steps = [
  "Cuéntanos tu meta (¿5K? ¿Maratón? ¿Trail?)",
  "Conecta con tu coach ideal",
  "Entrena y mejora con seguimiento personalizado",
];

const plans = [
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
      "Plan de entrenamiento ultra personalizado",
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

export default function Home() {
  return (
    <div className="min-h-screen bg-base text-base-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,102,51,0.08),transparent_42%),radial-gradient(circle_at_20%_30%,rgba(241,164,41,0.08),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_35%)]" />
      <header className="sticky top-0 z-20 border-b border-border/60 bg-base/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <a href="#hero" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                Terra Peak
              </span>
              <span className="text-lg font-semibold">RunnerCoach</span>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a className="hover:text-primary transition" href="#benefits">
              Beneficios
            </a>
            <a className="hover:text-primary transition" href="#coaches">
              Coaches
            </a>
            <a className="hover:text-primary transition" href="#events">
              Eventos
            </a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a
              className="hidden rounded-full border border-border px-4 py-2 font-semibold text-muted transition hover:border-primary/60 hover:text-primary md:inline-flex"
              href="/login"
            >
              Entrar
            </a>
            <a
              className="rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
              href="/register"
            >
              Encontrar Coach
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 md:px-6 lg:gap-20">
        <section id="hero" className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">
              Corre. Sube. Vence.
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              <span className="text-base-foreground">CORRE.</span>{" "}
              <span className="text-primary">SUBE.</span>{" "}
              <span className="text-accent">VENCE.</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted">
              Cada cima que conquistas, cada kilómetro que dueles, un coach te
              guía hacia tu mejor versión.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/register"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
              >
                ENCONTRAR MI COACH
              </a>
              <a
                href="#benefits"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-base-foreground transition hover:border-primary/60 hover:text-primary"
              >
                Ver cómo funciona
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface px-4 py-3"
                >
                  <div className="text-lg font-semibold">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wide text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-base to-surface p-6 shadow-xl shadow-black/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,102,51,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(241,164,41,0.18),transparent_38%)]" />
            <div className="relative space-y-4">
              <div className="text-xs uppercase tracking-[0.3em] text-muted">
                Montañas que se conquistan
              </div>
              <div className="grid gap-3 rounded-2xl border border-border/70 bg-base/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Progreso semanal
                    </p>
                    <h3 className="text-xl font-semibold text-primary">
                      Plan Trail Running
                    </h3>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Semana 8/12
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm text-muted">
                  <div>
                    <p className="text-xs uppercase tracking-wide">KM este mes</p>
                    <p className="text-lg font-semibold text-base-foreground">
                      124 km
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide">Mejora ritmo</p>
                    <p className="text-lg font-semibold text-primary">+15%</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide">Lesiones</p>
                    <p className="text-lg font-semibold text-accent">0</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border/70 bg-surface px-4 py-3 text-sm text-muted">
                  <span className="font-semibold text-base-foreground">
                    ¡Nueva marca personal!
                  </span>{" "}
                  10K en 48:32 · Coach Valeria · Feedback diario.
                </div>
              </div>
              <div className="grid gap-3 rounded-2xl border border-border/70 bg-surface/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Siguiente objetivo
                  </p>
                  <span className="rounded-full bg-border px-2 py-1 text-xs font-semibold text-muted">
                    Preparación
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-base-foreground">
                  Ultra Trail 50K · Valle Verde
                </h4>
                <p className="text-sm text-muted">
                  Sesiones de fuerza, técnica en bajadas y back-to-back long runs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Resultados que importan
            </p>
            <h2 className="text-3xl font-semibold">Lo que quieres lograr</h2>
            <p className="text-muted">
              No hablamos de funciones. Hablamos de lo que realmente quieres lograr.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface/80 p-5 shadow-lg shadow-black/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
                <div className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {item.stat}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="coaches" className="space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Historias de éxito
            </p>
            <h2 className="text-3xl font-semibold">
              Runners como tú alcanzando metas
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimony) => (
              <div
                key={testimony.name}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-5 shadow-lg shadow-black/20"
              >
                <p className="text-sm text-muted">“{testimony.quote}”</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold">
                      {testimony.name}
                    </div>
                    <div className="text-xs text-muted">{testimony.role}</div>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {testimony.goal}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <span className="rounded-full border border-border px-3 py-1">
              150+ Coaches certificados
            </span>
            <span className="rounded-full border border-border px-3 py-1">
              2,500+ Runners activos
            </span>
            <span className="rounded-full border border-border px-3 py-1">
              98% Satisfacción
            </span>
            <span className="rounded-full border border-border px-3 py-1">
              500+ Eventos
            </span>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-border bg-surface/70 p-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Simple y efectivo
            </p>
            <h2 className="text-3xl font-semibold">De principiante a finisher</h2>
            <p className="text-muted">
              No importa tu nivel actual. Nuestros coaches diseñan un plan
              personalizado para llevarte exactamente donde quieres llegar.
            </p>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-base/60 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-base-foreground">{step}</p>
                </div>
              ))}
            </div>
            <a
              href="/register"
              className="inline-flex w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
            >
              Empezar ahora
            </a>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-base to-surface p-6 shadow-xl shadow-black/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,102,51,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(241,164,41,0.14),transparent_38%)]" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Plan destacado
                  </p>
                  <h3 className="text-xl font-semibold text-primary">
                    Plan Trail Running
                  </h3>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Semana 8/12
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-muted">
                <div className="rounded-xl border border-border/70 bg-surface px-4 py-3">
                  <p className="text-xs uppercase tracking-wide">Duración</p>
                  <p className="text-lg font-semibold text-base-foreground">
                    12 semanas
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-surface px-4 py-3">
                  <p className="text-xs uppercase tracking-wide">Progreso</p>
                  <p className="text-lg font-semibold text-primary">8 / 12</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm text-muted">
                <div>
                  <p className="text-xs uppercase tracking-wide">KM este mes</p>
                  <p className="text-lg font-semibold text-base-foreground">
                    124 km
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide">Mejora ritmo</p>
                  <p className="text-lg font-semibold text-primary">+15%</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide">Lesiones</p>
                  <p className="text-lg font-semibold text-accent">0</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-base/70 px-4 py-3 text-sm text-muted">
                <span className="font-semibold text-base-foreground">
                  ¡Nueva marca personal!
                </span>{" "}
                10K en 48:32 · Coach Valeria · Feedback diario.
              </div>
            </div>
          </div>
        </section>

        <section id="plans" className="space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Elige tu nivel
            </p>
            <h2 className="text-3xl font-semibold">
              Planes para cada etapa de tu viaje
            </h2>
            <p className="text-muted">
              Planes diseñados para cada etapa de tu viaje como runner.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
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
                <p className="mt-2 text-lg font-semibold text-primary">
                  {plan.price}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/register"
                  className={`mt-6 inline-flex w-fit rounded-full px-5 py-3 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
                      : "border border-border text-base-foreground hover:border-primary/60 hover:text-primary"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="events" className="grid gap-8 rounded-3xl border border-border bg-surface/80 p-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Próximas carreras
            </p>
            <h2 className="text-3xl font-semibold">Corre con la comunidad</h2>
            <p className="text-muted">
              Estamos preparando las mejores carreras y eventos para la comunidad.
              Regístrate para ser el primero en enterarte.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/register"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
              >
                Regístrate ahora
              </a>
              <a
                href="#events"
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-base-foreground transition hover:border-primary/60 hover:text-primary"
              >
                Ver todos
              </a>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              {
                name: "Ultra Trail 50K 10/2025",
                date: "20 Oct 2025",
                location: "Valle Verde",
                slots: "9/250",
              },
              {
                name: "Carrera Solidaria 06/2025",
                date: "15 Jun 2025",
                location: "Playa del Este",
                slots: "0",
              },
              {
                name: "Carrera de Resistencia 11/2025",
                date: "27 Nov 2025",
                location: "Centro Deportivo",
                slots: "5",
              },
            ].map((event) => (
              <div
                key={event.name}
                className="rounded-2xl border border-border bg-base/60 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-base-foreground">
                      {event.name}
                    </h4>
                    <p className="text-xs text-muted">
                      {event.date} · {event.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-border px-3 py-1 text-xs font-semibold text-muted">
                    {event.slots} inscritos
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-gradient-to-r from-primary/15 via-accent/10 to-base/80 p-8 text-center shadow-lg shadow-black/20">
          <h2 className="text-3xl font-semibold">
            Tu mejor versión te está esperando
          </h2>
          <p className="mt-3 text-muted">
            Cada kilómetro cuenta. Cada entrenamiento te acerca a tu meta. Un coach
            profesional puede ser la diferencia entre intentar y lograr.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/register"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
            >
              Encontrar mi coach
            </a>
            <a
              href="/login"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-base-foreground transition hover:border-primary/60 hover:text-primary"
            >
              Ya tengo cuenta
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-base/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:px-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  Terra Peak
                </span>
                <span className="text-lg font-semibold">RunnerCoach</span>
              </div>
            </div>
            <p className="text-sm text-muted">
              Conectamos runners apasionados con coaches profesionales. Tu viaje
              hacia tus metas comienza aquí.
            </p>
            <p className="text-xs text-muted">Hecho de runners para runners</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm text-muted sm:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-base-foreground">
                Para Runners
              </h4>
              <a className="block hover:text-primary" href="#benefits">
                Beneficios
              </a>
              <a className="block hover:text-primary" href="#plans">
                Planes
              </a>
              <a className="block hover:text-primary" href="#events">
                Eventos
              </a>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-base-foreground">
                Compañía
              </h4>
              <span className="block">Sobre nosotros</span>
              <span className="block">Blog</span>
              <span className="block">Contacto</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-base-foreground">
                Legal
              </h4>
              <span className="block">Privacidad</span>
              <span className="block">Términos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
