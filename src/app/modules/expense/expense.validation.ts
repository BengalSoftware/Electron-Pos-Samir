import z from "zod";

const createExpenseZodSchema = z.object({
    body: z.object({
        reason: z.string({
            required_error: "Reason is required"
        }),
        category: z.object({
            name: z.string({ required_error: "category name is required" }),
            id: z.string({ required_error: "category id is required" }),
        }),
        account: z.object({
            name: z.string({ required_error: "account name is required" }),
            id: z.string({ required_error: "account id is required" }),
        }),
        subcategory: z.object({}).optional(),
        amount: z.number({
            required_error: "amount is required"
        }),
        checkNo: z.string().optional(),
        voucherNo: z.string().optional(),
        branchName: z.string().optional(),
        date: z.string().optional(),
        note: z.string().optional(),
        image: z.string().optional(),
    })
})

const getExpenseZodSchema = z.object({
    name: z.string({
        required_error: "param is required"
    }),
});

export const ExpenseValidation = {
    getExpenseZodSchema,
    createExpenseZodSchema
}