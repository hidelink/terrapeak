import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const paymentSchema = z.object({
  id: z.string().uuid().optional(),
  client_id: z.string().uuid({ message: "client_id inválido" }),
  coach_id: z.string().uuid().nullable().optional(),
  amount: z.string().min(1),
  currency: z.string().min(1),
  method: z.string().min(1),
  status: z.string().min(1),
  paid_at: z.string().min(4),
});

export async function upsertPayment(formData: FormData): Promise<void> {
  "use server";
  const parsed = paymentSchema.safeParse({
    id: formData.get("id")?.toString() || undefined,
    client_id: formData.get("client_id")?.toString(),
    coach_id: formData.get("coach_id")?.toString() || null,
    amount: formData.get("amount")?.toString(),
    currency: formData.get("currency")?.toString() || "MXN",
    method: formData.get("method")?.toString() || "transferencia",
    status: formData.get("status")?.toString() || "pagado",
    paid_at: formData.get("paid_at")?.toString() || new Date().toISOString().slice(0, 10),
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Datos inválidos");
  }

  const amountNumber = Number(parsed.data.amount);
  if (Number.isNaN(amountNumber)) {
    throw new Error("Monto inválido");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const payload = {
      client_id: parsed.data.client_id,
      coach_id: parsed.data.coach_id || null,
      amount: amountNumber,
      currency: parsed.data.currency,
      method: parsed.data.method,
      status: parsed.data.status,
      paid_at: parsed.data.paid_at,
    };

    const { error } = await supabase
      .from("payments")
      .upsert(parsed.data.id ? { id: parsed.data.id, ...payload } : payload);
    if (error) throw error;
    revalidatePath("/admin/payments");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo guardar el pago");
  }
}

export async function deletePayment(id: string): Promise<void> {
  "use server";
  if (!id) throw new Error("ID requerido");
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("payments").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/payments");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo eliminar el pago");
  }
}

