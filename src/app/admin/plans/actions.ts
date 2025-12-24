import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const planSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  price: z.string().min(1),
  currency: z.string().min(1),
  billing_period: z.string().min(1),
  features: z.string().optional(), // newline-separated
  is_featured: z.boolean().optional(),
});

export async function upsertPlan(formData: FormData): Promise<void> {
  "use server";
  const parsed = planSchema.safeParse({
    id: formData.get("id")?.toString() || undefined,
    name: formData.get("name")?.toString(),
    price: formData.get("price")?.toString(),
    currency: formData.get("currency")?.toString() || "MXN",
    billing_period: formData.get("billing_period")?.toString() || "mensual",
    features: formData.get("features")?.toString(),
    is_featured: formData.get("is_featured") === "on",
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Datos inválidos");
  }

  const priceNumber = Number(parsed.data.price);
  if (Number.isNaN(priceNumber)) {
    throw new Error("Precio inválido");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const payload = {
      name: parsed.data.name,
      price: priceNumber,
      currency: parsed.data.currency,
      billing_period: parsed.data.billing_period,
      features:
        parsed.data.features
          ?.split("\n")
          .map((f) => f.trim())
          .filter(Boolean) ?? [],
      is_featured: parsed.data.is_featured ?? false,
    };

    const { error } = await supabase.from("plans").upsert(
      parsed.data.id ? { id: parsed.data.id, ...payload } : payload
    );
    if (error) throw error;
    revalidatePath("/admin/plans");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo guardar el plan");
  }
}

export async function deletePlan(id: string): Promise<void> {
  "use server";
  if (!id) throw new Error("ID requerido");
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("plans").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/plans");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo eliminar el plan");
  }
}

