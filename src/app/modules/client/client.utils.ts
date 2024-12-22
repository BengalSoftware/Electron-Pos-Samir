import { Client } from "./client.model";

export const findLastSaleId = async (): Promise<string | undefined> => {
    const lastSale = await Client.findOne()
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastSale?.clientId ? lastSale.clientId : undefined;
};

// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
export const generateClientId = async (): Promise<string> => {
    const currentId = (await findLastSaleId()) || "BC-0";
    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString();
    const finalId = splitId[0] + "-" + incrementedId

    return finalId;
};
