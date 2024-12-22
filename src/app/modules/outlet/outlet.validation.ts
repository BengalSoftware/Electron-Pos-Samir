import { z } from 'zod';

const createManagementOutletZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Title is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    branch: z.string({
      required_error: 'Branch is required',
    }),
    vatRegisterNo: z.string().optional()
  }),
}).refine((data) => {
  // If the branch is "main", make vatRegisterNo required
  if (data.body.branch === "main") {
    if (!data.body.vatRegisterNo) {
      throw new Error("VatRegisterNo is required ");
    }
  }
  return true; // Return true to indicate the validation passed
});

const updateManagementOutletZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Title is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    branch: z.string({
      required_error: 'Branch is required',
    }),
    vatRegisterNo: z.string().optional()
  }),
});

export const ManagementOutletValidation = {
  createManagementOutletZodSchema,
  updateManagementOutletZodSchema,
};
