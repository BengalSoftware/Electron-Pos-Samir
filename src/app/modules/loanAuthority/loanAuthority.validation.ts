import z from "zod";

const createLoanAuthorityZodSchema = z.object({
    body: z.object({
        reason: z.string({
            required_error: "Reason is required"
        }),
        amount: z.string({
            required_error: "Amount number name is required"
        }),
        account: z.string({
            required_error: "Account number is required"
        }),
        status: z.string({
            required_error: "Status is required"
        }),
        type: z.string({
            required_error: "Type is required debit/credit"
        }),
        createdBy: z.string({
            required_error: "Created by is required"
        }),
        date: z.string().optional(),
        note: z.string().optional(),
    })
})

const getLoanAuthorityZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const LoanAuthorityValidation = {
    getLoanAuthorityZodSchema,
    createLoanAuthorityZodSchema
}