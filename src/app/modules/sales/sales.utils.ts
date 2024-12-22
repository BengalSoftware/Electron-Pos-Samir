import { Sales } from "./sales.model";

export const findLastSaleId = async (): Promise<string | undefined> => {
    const lastSale = await Sales.findOne()
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastSale?.invoiceNo ? lastSale.invoiceNo : undefined;
};

// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
export const generateSaleId = async (): Promise<string> => {
    const currentId = (await findLastSaleId()) || "AI-0";
    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString();
    const finalId = splitId[0] + "-" + incrementedId

    return finalId;
};
