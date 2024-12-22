import { IRole } from "./role.interface";
import { Role } from "./role.model";

const createRole = async (payload: IRole): Promise<IRole | null> => {
    const result = await Role.create(payload);
    return result;
}
const getAllRoles = async (): Promise<IRole[] | null> => {
    const result = await Role.find({
    })
        // .sort({ createdAt: "desc" })
        .select({ permissions: 0 })
    return result;
}
const getSingleRole = async (payload: string): Promise<IRole | null> => {
    const result = await Role.findById(payload);
    return result;
}

const deleteRole = async (payload: string) => {
    await Role.findByIdAndDelete(payload);
}

const deleteAllRoles = async () => {
    await Role.deleteMany({});
}

// UPDATE ROLE
const updateRole = async (id: string, payload: IRole): Promise<IRole | null> => {
    const result = await Role.findOneAndUpdate({ _id: id }, { permissions: payload.permissions, name: payload.name }, { new: true })
    return result;
}

export const RoleService = {
    createRole,
    getSingleRole,
    updateRole,
    getAllRoles,
    deleteRole,
    deleteAllRoles
};
