import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  date: z.string().min(4), // YYYY-MM-DD
  location: z.string().min(2),
  slots: z.string().optional().nullable(),
});

export async function upsertEvent(formData: FormData): Promise<void> {
  "use server";
  const parsed = eventSchema.safeParse({
    id: formData.get("id")?.toString() || undefined,
    name: formData.get("name")?.toString(),
    date: formData.get("date")?.toString(),
    location: formData.get("location")?.toString(),
    slots: formData.get("slots")?.toString() || null,
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Datos inválidos");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const payload = {
      name: parsed.data.name,
      date: parsed.data.date,
      location: parsed.data.location,
      slots: parsed.data.slots,
    };

    const { error } = await supabase
      .from("events")
      .upsert(parsed.data.id ? { id: parsed.data.id, ...payload } : payload);

    if (error) throw error;
    revalidatePath("/admin/events");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo guardar el evento");
  }
}

export async function deleteEvent(id: string): Promise<void> {
  "use server";
  if (!id) throw new Error("ID requerido");
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/events");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo eliminar el evento");
  }
}

