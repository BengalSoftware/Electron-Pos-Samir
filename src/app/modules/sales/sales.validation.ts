import z from "zod";

const createSalesZodSchema = z.object({
    body: z.object({
        products: z.array(z.object({
            _id: z.string({ required_error: 'Product id required' }),
            name: z.string({ required_error: 'Product name required' }),
            quantity: z.number({ required_error: 'Product quantity required' }),
            purchasePrice: z.number({ required_error: 'Product price required' }),
            purchaseVat: z.number({ required_error: 'SalesVat id required' }),
            totalPrice: z.number({ required_error: 'totalPrice id required' }),
        })).refine(
            (arr) => arr.length >= 1,
            {
                message: 'Products is required',
            }
        ),
        client: z.object({
            name: z.string({ required_error: "supplier name required" })
        }),
        // paymentId: z.array(z.string().optional()),
        invoiceTax: z.number({ required_error: "Invoice tax is required" }),
        // taxAmount: z.number({ required_error: "Invoice tax is required" }),
        // totalTax: z.number({ required_error: "Total tax is required" }),
        netTotal: z.number({ required_error: "Net total is required" }),
        subTotal: z.number({ required_error: "Sub total is required" }),
        poReference: z.string().optional(),
        paymentTerms: z.string().optional(),
        discount: z.number().optional(),
        discountAmount: z.string().optional(),
        discountType: z.string().optional(),
        deliveryPlace: z.string().optional(),
        transportCost: z.number().optional(),
        poDate: z.string().optional(),
        note: z.string().optional(),
        status: z.string({ required_error: "Status is required" }),
        image: z.string().optional(),
    })
})

const getSalesZodSchema = z.object({
    name: z.string({
        required_error: "param is required"
    }),
});

export const SalesValidation = {
    getSalesZodSchema,
    createSalesZodSchema
}