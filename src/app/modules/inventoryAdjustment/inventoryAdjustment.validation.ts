import z from "zod";
const productSchema = z.object({
    _id: z.string({ required_error: 'Product id required' }),
    name: z.string({ required_error: 'Product name required' }),
    adjustmentQty: z.number({ required_error: 'Product quantity required' }),
    price: z.number({ required_error: 'Product price required' }),
    type: z.string({ required_error: 'Type is required' }),
    code: z.string({ required_error: 'Product code is required' }),
});

const createInventoryAdjustmentZodSchema = z.object({
    body: z.object({
        products: z.array(productSchema).refine(
            (arr) => arr.length >= 1,
            {
                message: 'Minimum one product returned quantity is required!',
            }
        ),

        status: z.string({ required_error: "Status is required" }),
        date: z.string().optional(),
        note: z.string().optional(),
        createdBy: z.string().optional(),
    })
})

const getInventoryAdjustmentZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const InventoryAdjustmentValidation = {
    getInventoryAdjustmentZodSchema,
    createInventoryAdjustmentZodSchema
}