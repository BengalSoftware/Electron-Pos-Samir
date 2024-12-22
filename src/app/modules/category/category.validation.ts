import z from "zod";

const createCategoryZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Role name is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
    })
})

const getCategoryZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const CategoryValidation = {
    getCategoryZodSchema,
    createCategoryZodSchema
}