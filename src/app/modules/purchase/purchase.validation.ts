import z from "zod";
const productSchema = z.object({
    _id: z.string({ required_error: 'Product id required' }),
    name: z.string({ required_error: 'Product name required' }),
    quantity: z.number({ required_error: 'Product quantity required' }),
    purchasePrice: z.number({ required_error: 'Product price required' }),
    purchaseVat: z.number({ required_error: 'purchaseVat id required' }),
    totalPrice: z.number({ required_error: 'totalPrice id required' }),
})

const createPurchaseZodSchema = z.object({
    body: z.object({
        products: z.array(productSchema).refine(
            (arr) => arr.length >= 1,
            {
                message: 'Products is required',
            }
        ),
        supplier: z.object({
            id: z.string({ required_error: "supplier id required" }),
            name: z.string({ required_error: "supplier name required" })
        }),
        // paymentId: z.array(z.string().optional()),
        invoiceTax: z.number({ required_error: "Invoice tax is required" }),
        totalTax: z.number({ required_error: "total tax is required" }),
        netTotal: z.number({ required_error: "net total is required" }),
        subTotal: z.number({ required_error: "net total is required" }),
        poReference: z.string().optional(),
        paymentTerms: z.string().optional(),
        discount: z.number().optional(),
        transportCost: z.number().optional(),
        purchaseDate: z.string().optional(),
        poDate: z.string().optional(),
        note: z.string().optional(),
        status: z.string({ required_error: "Status is required" }),
        image: z.string().optional(),
    })
})

const getPurchaseZodSchema = z.object({
    name: z.string({
        required_error: "param is required"
    }),
});

export const PurchaseValidation = {
    getPurchaseZodSchema,
    createPurchaseZodSchema
}