import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name").max(120, "Name is too long");

const email = z
  .string()
  .trim()
  .min(5, "Please enter your email")
  .max(200, "Email is too long")
  .email("Please enter a valid email address");

const phone = z
  .string()
  .trim()
  .min(7, "Please enter your phone number")
  .max(20, "Phone number is too long")
  .regex(/^[0-9+\-()\s]+$/, "Phone number can only contain digits and + - ( )");

const businessName = z
  .string()
  .trim()
  .max(150, "Business name is too long")
  .optional()
  .or(z.literal(""));
const details = z
  .string()
  .trim()
  .max(2000, "Please keep this under 2000 characters")
  .optional()
  .or(z.literal(""));

export const requestSchema = z.object({
  kind: z.enum(["service", "contact", "callback"]),
  serviceName: z.string().trim().max(150).optional().or(z.literal("")),
  name,
  email,
  phone,
  businessName,
  details,
});

export type RequestInput = z.infer<typeof requestSchema>;

export const formSchema = requestSchema.omit({ kind: true, serviceName: true });
export type FormValues = z.infer<typeof formSchema>;
