import z from "zod";

const createAccountZodSchema = z.object({
    body: z.object({
        bankName: z.string({
            required_error: "Bank name name is required"
        }),
        accountNumber: z.string({
            required_error: "Account number name is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
        branchName: z.string().optional(),
        date: z.string().optional(),
        note: z.string().optional(),
        image: z.string().optional(),
    })
})

const getAccountZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const AccountValidation = {
    getAccountZodSchema,
    createAccountZodSchema
}