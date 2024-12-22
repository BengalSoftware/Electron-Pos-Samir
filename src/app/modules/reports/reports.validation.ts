import z from "zod";

const createReportsZodSchema = z.object({
    body: z.object({
        month: z.number({
            required_error: "Month is required"
        }),
        year: z.number({
            required_error: "Year is required"
        }),

    })
})

const getReportsZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const ReportsValidation = {
    getReportsZodSchema,
    createReportsZodSchema
}