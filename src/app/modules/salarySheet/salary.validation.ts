import { z } from 'zod';

const updateSalaryZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    name: z.string({
      required_error: 'Name is required',
    }),
    paidSalary: z.number({
      required_error: 'Paid Salary is required',
    }),

    dueSalary: z.number().optional(),
    bonus: z.number().optional(),
    salaryDate: z.string().optional(),
    note: z.string().optional(),
  }),
})

export const SalaryValidation = {
  updateSalaryZodSchema,
};
