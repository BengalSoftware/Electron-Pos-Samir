import z from "zod";

const createProductZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        model: z.string().optional(),
        image: z.array(z.string()).optional(),
        barcodeSymbology: z.string({ required_error: "barcode symbology is required" }),
        category: z.object({
            id: z.string({ required_error: "Category id is required" }),
            name: z.string({ required_error: "Category name is required" }),
        }),
        subcategory: z.object({
            id: z.string({ required_error: "Subcategory id is required" }),
            name: z.string({ required_error: "Subcategory name is required" }),
        }),
        brand: z.string().optional(),
        unit: z.string({ required_error: "Unit is required" }), //box pc kg liter gram gram mill liter etc..
        vat: z.number({ required_error: "Vat is required" }),
        vatType: z.string({ required_error: "Vat type is required" }),
        purchasePrice: z.number({ required_error: "Price is required " }),
        discountPercentage: z.number().optional(), //percentage 
        sellingPrice: z.number({
            required_error: "Selling price is required"
        }),
        note: z.string().optional(),
        quantity: z.number().optional(),
        alertQuantity: z.number().optional(),
        status: z.string({ required_error: "Status is required" }),
        //suppliers 
        totalSale: z.number().optional(),
        supplier: z.string().optional(), //ref with supplier model 
    })
})

const productZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const ProductValidation = {
    productZodSchema,
    createProductZodSchema
}