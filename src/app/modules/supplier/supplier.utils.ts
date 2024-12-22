import { Supplier } from "./supplier.model";

export const findLastSaleId = async (): Promise<string | undefined> => {
    const lastSale = await Supplier.findOne()
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastSale?.code ? lastSale.code : undefined;
};

// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
export const generateSupplierCode = async (): Promise<string> => {
    const currentId = (await findLastSaleId()) || "BS-0";


    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString();
    const finalId = splitId[0] + "-" + incrementedId

    return finalId;
};
