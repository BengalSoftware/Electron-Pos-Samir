import z from "zod";

const createBalanceAdjustmentZodSchema = z.object({
    body: z.object({
        accountId: z.string({
            required_error: "Account is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
        amount: z.number({
            required_error: "Amount is required"
        }),
        type: z.string({
            required_error: "Type is required"
        }),
        branchName: z.string().optional(),
        date: z.string().optional(),
        note: z.string().optional(),
        image: z.string().optional(),
    })
})

const getBalanceAdjustmentZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const BalanceAdjustmentValidation = {
    getBalanceAdjustmentZodSchema,
    createBalanceAdjustmentZodSchema
}