import z from "zod";

const createClientZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        // clientId: z.string({
        //     required_error: 'Id is required',
        // }),
        contactNo: z.string({
            required_error: 'Contact number is required',
        }),
        status: z.string({ required_error: "Status is required" }),
        email: z.string().optional(),
        address: z.string().optional(),
        companyName: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        profileImage: z.string().optional(),
        note: z.string().optional(),
    }),
})

const getClientZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const ClientValidation = {
    getClientZodSchema,
    createClientZodSchema
}