import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const coachSchema = z.object({
  id: z.string().optional(),
  profile_id: z.string().uuid({ message: "profile_id inválido" }),
  status: z.string().optional(),
});

export async function upsertCoach(formData: FormData): Promise<void> {
  "use server";
  const parsed = coachSchema.safeParse({
    id: formData.get("id")?.toString() || undefined,
    profile_id: formData.get("profile_id")?.toString(),
    status: formData.get("status")?.toString() || "aprobado",
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Datos inválidos");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const payload = {
      profile_id: parsed.data.profile_id,
      status: parsed.data.status ?? "aprobado",
    };

    const { error } = await supabase
      .from("coaches")
      .upsert(parsed.data.id ? { id: parsed.data.id, ...payload } : payload);
    if (error) throw error;
    revalidatePath("/admin/coaches");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo guardar el coach");
  }
}

export async function deleteCoach(id: string): Promise<void> {
  "use server";
  if (!id) throw new Error("ID requerido");
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("coaches").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/coaches");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo eliminar el coach");
  }
}

