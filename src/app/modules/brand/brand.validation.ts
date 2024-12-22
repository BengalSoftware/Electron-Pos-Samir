import z from "zod";

const createBrandZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Role name is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
    })
})

const getBrandZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const BrandValidation = {
    getBrandZodSchema,
    createBrandZodSchema
}