import { ProductReturn } from "./productReturn.model";

export const findLastCode = async (): Promise<string | undefined> => {
    const lastSale = await ProductReturn.findOne()
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastSale?.code ? lastSale.code : undefined;
};

// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
export const generateProductReturnCode = async (): Promise<string> => {
    const currentId = (await findLastCode()) || "BPR-0";


    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString();
    const finalId = splitId[0] + "-" + incrementedId

    return finalId;
};
