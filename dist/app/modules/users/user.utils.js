"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.findLastAdminId = exports.generateCustomerId = exports.findLastCustomerId = void 0;
const user_model_1 = require("./user.model");
let lastUserId = 0;
const findLastCustomerId = async () => {
    const lastCustomer = await user_model_1.User.findOne({
        role: 'customer'
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastCustomer?.id ? lastCustomer?.id?.substring(4) : undefined;
};
exports.findLastCustomerId = findLastCustomerId;
const generateCustomerId = async () => {
    const currentId = (await (0, exports.findLastCustomerId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `C-${incrementedId}`;
    return incrementedId;
};
exports.generateCustomerId = generateCustomerId;
const findLastAdminId = async () => {
    const lastAdmin = await user_model_1.User.findOne({
        role: 'admin'
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastAdmin?.id ? lastAdmin?.id?.substring(4) : undefined;
};
exports.findLastAdminId = findLastAdminId;
const generateAdminId = async () => {
    const currentId = (await (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
};
exports.generateAdminId = generateAdminId;
