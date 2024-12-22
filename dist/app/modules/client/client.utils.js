"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateClientId = exports.findLastSaleId = void 0;
const client_model_1 = require("./client.model");
const findLastSaleId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastSale = yield client_model_1.Client.findOne()
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastSale === null || lastSale === void 0 ? void 0 : lastSale.clientId) ? lastSale.clientId : undefined;
});
exports.findLastSaleId = findLastSaleId;
// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
const generateClientId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastSaleId)()) || "BC-0";
    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString();
    const finalId = splitId[0] + "-" + incrementedId;
    return finalId;
});
exports.generateClientId = generateClientId;
