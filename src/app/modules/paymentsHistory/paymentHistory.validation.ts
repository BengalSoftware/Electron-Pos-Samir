import z from "zod";
const productSchema = z.object({
    _id: z.string({ required_error: 'Product id required' }),
    name: z.string({ required_error: 'Product name required' }),
    quantity: z.number({ required_error: 'Product quantity required' }),
    returnQty: z.number({ required_error: 'Product quantity required' }),
    purchasePrice: z.number({ required_error: 'Product price required' }),
    purchaseVat: z.number({ required_error: 'VAt is required' }),
    totalPrice: z.number({ required_error: 'totalPrice id required' }),
});
const createPaymentHistoryZodSchema = z.object({
    body: z.object({
        products: z.array(productSchema).refine(
            (arr) => arr.length >= 1,
            {
                message: 'Minimum one product returned quantity is required!',
            }
        ),
        totalTax: z.number({ required_error: "total tax is required" }),
        netTotal: z.number({ required_error: "net total is required" }),
        chequeNo: z.string().optional(),
        receiptNo: z.string().optional(),
        discount: z.number().optional(),
        transportCost: z.number().optional(),
        date: z.string().optional(),
        note: z.string().optional(),
        status: z.string({ required_error: "Status is required" }),
        image: z.string().optional(),
    })
})

const getPaymentHistoryZodSchema = z.object({
    name: z.string({
        required_error: "param is required"
    }),
});

export const PaymentHistoryValidation = {
    getPaymentHistoryZodSchema,
    createPaymentHistoryZodSchema
}