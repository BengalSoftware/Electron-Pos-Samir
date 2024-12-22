import z from "zod";

const createDepartmentZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Role name is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
    })
})

const getDepartmentZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const DepartmentValidation = {
    getDepartmentZodSchema,
    createDepartmentZodSchema
}