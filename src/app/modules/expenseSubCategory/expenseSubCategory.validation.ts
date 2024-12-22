import z from "zod";

const createSubCategoryZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Role name is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
        note: z.string().optional(),
        category: z.string({
            required_error: "Category id is required"
        }),
    })
})

const getSubCategoryZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const SubCategoryValidation = {
    getSubCategoryZodSchema,
    createSubCategoryZodSchema
}