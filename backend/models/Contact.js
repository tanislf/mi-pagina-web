import * as z from "zod";

export const ContactSchema = z
  .object({
    service: z.enum(["Ilustración", "Website", "Fotografía", "Edición"]),

    time: z.enum(["Urgente", "Proximo", "Hay tiempo", "Relajate"]),

    budget: z.enum(["Bajo", "Medio", "Alto", "Super"]),

    difusion: z.enum(["Redes", "Linkedin", "Recomendacion", "Otro"]),

    name: z.string().trim().min(1, "Nombre es requerido"),

    email: z
      .string()
      .trim()
      .min(1, "Email es requerido")
      .email("Email no es válido"),

    phone: z
      .string()
      .trim()
      .regex(/^[0-9+()\-\s]+$/, "Formato de teléfono inválido")
      .optional(),

    message: z
      .string()
      .trim()
      .min(10, "El mensaje debe tener al menos 10 caracteres")
      .max(500, "Máximo 500 caracteres"),
  })
  .strict();

//REVISION
