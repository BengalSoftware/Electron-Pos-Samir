import { Employee } from "../employee/employee.model";

export const findLastEmployeeId = async (): Promise<string | undefined> => {
    const lastSale = await Employee.findOne()
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastSale?.code ? lastSale.code : undefined;
};

// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
export const generateEmployeeCode = async (): Promise<string> => {
    const currentId = (await findLastEmployeeId()) || "BE-0";


    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString();
    const finalId = splitId[0] + "-" + incrementedId

    return finalId;
};
