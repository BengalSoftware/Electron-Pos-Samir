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
exports.generateEmployeeCode = exports.findLastEmployeeId = void 0;
const employee_model_1 = require("../employee/employee.model");
const findLastEmployeeId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastSale = yield employee_model_1.Employee.findOne()
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastSale === null || lastSale === void 0 ? void 0 : lastSale.code) ? lastSale.code : undefined;
});
exports.findLastEmployeeId = findLastEmployeeId;
// export const generateSaleId = async (academicSemester: IAcademicSemester): Promise<string> => {
const generateEmployeeCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastEmployeeId)()) || "BE-0";
    //increment by 1
    const splitId = currentId.split("-");
    const incrementedId = (parseInt(splitId[1]) + 1).toString();
    const finalId = splitId[0] + "-" + incrementedId;
    return finalId;
});
exports.generateEmployeeCode = generateEmployeeCode;
