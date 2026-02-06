import * as z from "zod";

export const ContactSchema = z.object({
  service: z.enum(["Ilustración", "Website", "Fotografía", "Edición"], {
    errorMap: () => ({ message: "Selecciona un servicio válido" }),
  }),

  time: z.enum(["Urgente", "Próximo", "Hay tiempo", "Relájate"], {
    errorMap: () => ({ message: "Selecciona un plazo válido" }),
  }),

  budget: z.enum(["Bajo", "Medio", "Alto", "Super"], {
    errorMap: () => ({ message: "Selecciona un presupuesto válido" }),
  }),

  difusion: z.enum(["Redes", "Linkedin", "Recomendación", "Otro"], {
    errorMap: () => ({ message: "Selecciona cómo te enteraste válido" }),
  }),

  name: z.string().trim().min(1, "Nombre es requerido"),

  email: z
    .string()
    .trim()
    .min(1, "Email es requerido")
    .email("Email no es válido"),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]*$/, "Formato de teléfono inválido")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "Máximo 500 caracteres"),
});

export default ContactSchema;

//REVISION
