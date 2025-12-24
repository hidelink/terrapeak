import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MockBanner } from "../_components/mock-banner";
import { deleteEvent, upsertEvent } from "./actions";

const fallbackEvents = [
  {
    name: "Carrera Solidaria 06/2025",
    date: "15 Jun 2025",
    location: "Playa del Este",
    slots: "0",
  },
  {
    name: "Ultra Trail 50K 10/2025",
    date: "20 Oct 2025",
    location: "Valle Verde",
    slots: "0",
  },
  {
    name: "Carrera de Resistencia 11/2025",
    date: "27 Nov 2025",
    location: "Centro Deportivo",
    slots: "5",
  },
  {
    name: "Ultra Backyard 2025",
    date: "12 Dic 2025",
    location: "La Soledad Bike Park, Zapopan, Jalisco",
    slots: "9/250",
  },
];

async function getEvents() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("events")
      .select("id,name,date,location,slots")
      .order("date", { ascending: true });
    if (error) throw error;
    return { items: data ?? [], usingMock: false };
  } catch {
    return {
      items: fallbackEvents.map((e) => ({ ...e, id: "" })),
      usingMock: true,
    };
  }
}

export default async function EventsPage() {
  const { items: events, usingMock } = await getEvents();
  return (
    <div className="space-y-6">
      <MockBanner show={usingMock} />
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Eventos
        </p>
        <h2 className="text-2xl font-semibold">Crea y gestiona eventos</h2>
      </div>

      <EventForm />

      <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-lg shadow-black/20">
        <table className="min-w-full text-sm">
          <thead className="bg-base/70 text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Ubicación</th>
              <th className="px-4 py-3 text-left">Inscritos</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <tr
                key={`${event.name}-${event.date}-${idx}`}
                className={idx % 2 === 0 ? "bg-base/40" : "bg-base/20"}
              >
                <td className="px-4 py-3 font-semibold text-base-foreground">
                  {event.name}
                </td>
                <td className="px-4 py-3 text-muted">{event.date}</td>
                <td className="px-4 py-3 text-muted">{event.location}</td>
                <td className="px-4 py-3 text-muted">{event.slots}</td>
                <td className="px-4 py-3 text-primary space-x-2">
                  {event.id ? (
                    <form action={deleteEvent.bind(null, (event as any).id ?? "")} className="inline">
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

function EventForm() {
  return (
    <form
      action={upsertEvent}
      className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-base/70 p-4 text-sm"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Nombre</label>
        <input
          name="name"
          required
          placeholder="Nombre del evento"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Fecha</label>
        <input
          name="date"
          required
          type="date"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Ubicación</label>
        <input
          name="location"
          required
          placeholder="Ubicación"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Slots</label>
        <input
          name="slots"
          placeholder="9/250 o 0"
          className="rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--tp-primary)_90%,black)]"
      >
        Guardar evento
      </button>
    </form>
  );
}

