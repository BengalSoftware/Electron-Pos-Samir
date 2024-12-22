import { Product } from "./product.model";

export const findLastSaleId = async (): Promise<string | undefined> => {
    const lastSale = await Product.findOne()
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastSale?.productCode ? lastSale.productCode : undefined;
};

// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
export const generateProductCode = async (): Promise<string> => {
    const currentId = (await findLastSaleId()) || "BP-00000000";


    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString().padStart(8, '0');
    const finalId = splitId[0] + "-" + incrementedId

    return finalId;
};
