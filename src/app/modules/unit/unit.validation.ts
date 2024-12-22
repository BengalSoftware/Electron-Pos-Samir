import z from "zod";

const createUnitZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Role name is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
    })
})

const getUnitZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const UnitValidation = {
    getUnitZodSchema,
    createUnitZodSchema
}