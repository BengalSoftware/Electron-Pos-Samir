import z from "zod";

const createBalanceTransferZodSchema = z.object({
    body: z.object({
        fromAccount: z.string({
            required_error: "From account is required"
        }),
        toAccount: z.string({
            required_error: "To account is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
        amount: z.number({
            required_error: "Amount is required"
        }),
        date: z.string().optional(),
        note: z.string().optional(),
        image: z.string().optional(),
    })
})

const getBalanceTransferZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const BalanceTransferValidation = {
    getBalanceTransferZodSchema,
    createBalanceTransferZodSchema
}