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
exports.SettingsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const settings_model_1 = require("./settings.model");
const createSettings = (payload, images) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const hasAlreadyMain = yield settings_model_1.Settings.find();
    if (hasAlreadyMain.length > 0) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Already have a setting. Now you can updated only!");
    }
    if ((_a = images.whiteLogo) === null || _a === void 0 ? void 0 : _a[0].filename)
        payload.whiteLogo = images.whiteLogo[0].filename;
    if ((_b = images.blackLogo) === null || _b === void 0 ? void 0 : _b[0].filename)
        payload.blackLogo = images.blackLogo[0].filename;
    if ((_c = images.smallLogo) === null || _c === void 0 ? void 0 : _c[0].filename)
        payload.smallLogo = images.smallLogo[0].filename;
    if ((_d = images.favIcon) === null || _d === void 0 ? void 0 : _d[0].filename)
        payload.favIcon = images.favIcon[0].filename;
    const result = yield settings_model_1.Settings.create(payload);
    return result;
});
const getAllSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findOne();
    return result;
});
const updateSettings = (id, payload, images) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l, _m;
    console.log(images);
    if ((_f = (_e = images === null || images === void 0 ? void 0 : images.whiteLogo) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.filename)
        payload.whiteLogo = images.whiteLogo[0].filename;
    if ((_h = (_g = images === null || images === void 0 ? void 0 : images.blackLogo) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.filename)
        payload.blackLogo = images.blackLogo[0].filename;
    if ((_k = (_j = images === null || images === void 0 ? void 0 : images.smallLogo) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.filename)
        payload.smallLogo = images.smallLogo[0].filename;
    if ((_m = (_l = images === null || images === void 0 ? void 0 : images.favIcon) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.filename)
        payload.favIcon = images.favIcon[0].filename;
    const result = yield settings_model_1.Settings.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSettings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findByIdAndDelete(id);
    return result;
});
exports.SettingsService = {
    createSettings,
    getAllSettings,
    updateSettings,
    deleteSettings,
};
