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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("../admin/admin.model");
const employee_model_1 = require("../employee/employee.model");
const user_model_1 = require("./user.model");
const mongoose_2 = require("mongoose");
const superAdmin_model_1 = require("../superAdmin/superAdmin.model");
const user_utils_1 = require("./user.utils");
// CREATE EMPLOYEE
const createEmployee = (employee, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    //hash password on model
    const session = yield mongoose_1.default.startSession();
    let newEmployeeId = new mongoose_2.Types.ObjectId();
    try {
        session.startTransaction();
        employee.code = yield (0, user_utils_1.generateEmployeeCode)();
        // Create student using session
        const newEmployee = yield employee_model_1.Employee.create([employee], { session });
        if (!newEmployee.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create employee');
        }
        // set employee _id (reference) into user.employee
        newEmployeeId = newEmployee[0]._id;
        let newUser = null;
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.email) {
            const user = {
                email: userInfo.email,
                password: userInfo.password,
                role: userInfo.role,
                employee: newEmployeeId,
            };
            newUser = yield user_model_1.User.create([user], { session });
            if (!newUser.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    const newUserAllData = yield employee_model_1.Employee.findOne({ _id: newEmployeeId });
    return newUserAllData;
});
// CREATE ADMIN
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    let newAdminId = new mongoose_2.Types.ObjectId();
    try {
        session.startTransaction();
        // generate admin id
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin ');
        }
        newAdminId = newAdmin[0]._id;
        let newUser = null;
        if ((admin === null || admin === void 0 ? void 0 : admin.email) && (admin === null || admin === void 0 ? void 0 : admin.password)) {
            const user = {
                email: admin.email,
                password: admin.password,
                role: 'admin',
                admin: newAdminId,
            };
            newUser = yield user_model_1.User.create([user], { session });
            if (!newUser.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    newUserAllData = yield user_model_1.User.findOne({ _id: newAdminId });
    return newUserAllData;
});
// CREATE SUPER ADMIN
const createSuperAdmin = (superAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    let newAdminId = new mongoose_2.Types.ObjectId();
    const superAdminAlreadyExist = yield superAdmin_model_1.SuperAdmin.find({});
    if (superAdminAlreadyExist.length > 0) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Super admin already created');
    }
    try {
        session.startTransaction();
        // generate admin id
        const newAdmin = yield superAdmin_model_1.SuperAdmin.create([superAdmin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create super admin ');
        }
        newAdminId = newAdmin[0]._id;
        let newUser = null;
        if ((superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.email) && (superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.password)) {
            const user = {
                email: superAdmin.email,
                password: superAdmin.password,
                role: 'superAdmin',
                admin: newAdminId,
            };
            newUser = yield user_model_1.User.create([user], { session });
            if (!newUser.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    newUserAllData = yield user_model_1.User.findOne({ _id: newAdminId });
    return newUserAllData;
});
exports.UserService = {
    createEmployee,
    createAdmin,
    createSuperAdmin
};
