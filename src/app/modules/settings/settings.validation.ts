import { z } from 'zod';

const createSettingsZodSchema = z.object({
  body: z.object({
    // company information
    companyName: z.string({
      required_error: "companyName is required"
    }),
    companyTagline: z.string({
      required_error: "companyTagline is required"
    }),
    companyEmail: z.string({
      required_error: "companyEmail is required"
    }),
    companyPhone: z.string({
      required_error: "companyPhone is required"
    }),
    companyAddress: z.string({
      required_error: "companyAddress is required"
    }),

    // prefixes
    clientPrefix: z.string({
      required_error: "clientPrefix is required"
    }),
    supplierPrefix: z.string({
      required_error: "supplierPrefix is required"
    }),
    employeePrefix: z.string({
      required_error: "employeePrefix is required"
    }),
    productPrefix: z.string({
      required_error: "productPrefix is required"
    }),
    purchasePrefix: z.string({
      required_error: "purchasePrefix is required"
    }),
    purchaseReturnPrefix: z.string({
      required_error: "purchaseReturnPrefix is required"
    }),
    invoicePrefix: z.string({
      required_error: "invoicePrefix is required"
    }),
    invoiceReturnPrefix: z.string({
      required_error: "invoiceReturnPrefix is required"
    }),
    inventoryAdjustmentPrefix: z.string({
      required_error: "inventoryAdjustmentPrefix is required"
    }),
    currencyIcon: z.string({
      required_error: "currencyIcon is required"
    }),
    copyrightText: z.string({
      required_error: "copyrightText is required"
    }),
  }),
});


export const SettingsValidation = {
  createSettingsZodSchema,
};
