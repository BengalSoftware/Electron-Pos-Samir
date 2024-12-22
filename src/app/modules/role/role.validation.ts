import z from "zod";

const createRoleZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Role name is required"
        }),
        permissions: z.array(z.string()),
    })
})

const getRoleZodSchema = z.object({
    name: z.string({
        required_error: "Param is required"
    }),
});

export const RoleValidation = {
    createRoleZodSchema,
    getRoleZodSchema
}