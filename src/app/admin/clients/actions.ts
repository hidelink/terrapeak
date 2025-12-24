import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const clientSchema = z.object({
  id: z.string().uuid({ message: "id de cliente requerido para editar" }),
  coach_id: z.string().uuid().nullable().optional(),
  plan_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
});

export async function upsertClient(formData: FormData): Promise<void> {
  "use server";
  const parsed = clientSchema.safeParse({
    id: formData.get("id")?.toString(),
    coach_id: formData.get("coach_id")?.toString() || null,
    plan_id: formData.get("plan_id")?.toString() || null,
    status: formData.get("status")?.toString() || "activo",
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Datos inválidos");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const payload = {
      coach_id: parsed.data.coach_id || null,
      plan_id: parsed.data.plan_id || null,
      status: parsed.data.status ?? "activo",
    };

    const { error } = await supabase.from("clients").upsert({ id: parsed.data.id, ...payload });
    if (error) throw error;
    revalidatePath("/admin/clients");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo guardar el cliente");
  }
}

export async function deleteClient(id: string): Promise<void> {
  "use server";
  if (!id) throw new Error("ID requerido");
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/clients");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo eliminar el cliente");
  }
}

