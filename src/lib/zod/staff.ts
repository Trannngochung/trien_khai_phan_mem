import { z } from "zod";

export const staffSchema = z.object({
  accountId: z.number().min(1, "Account ID is required"),
  dob: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .transform((date) => new Date(date)),
  gender: z.string().min(1, "Gender is required"),
  fullName: z.string().min(1, "Full Name is required"),
  position: z.string().min(1, "Position is required"),
  phone: z.string().min(1, "Phone is required"),
  department: z.string().min(1, "Department is required"),
});
