"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCustomerId = exports.findLastCustomerId = void 0;
const customer_model_1 = require("./customer.model");
let lastUserId = 0;
const findLastCustomerId = async () => {
    const lastUser = await customer_model_1.Customer.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser?.id;
};
exports.findLastCustomerId = findLastCustomerId;
const generateCustomerId = async () => {
    const currentId = (await (0, exports.findLastCustomerId)()) || (0).toString().padStart(5, '0');
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementedId;
    // lastUserId++;
    // return String(lastUserId).padStart(5, '0')
};
exports.generateCustomerId = generateCustomerId;
