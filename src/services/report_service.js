const bcrypt = require("bcrypt");
const model = require("../model/report_model");
const { requestResponse } = require("../utils");

let response;

const create = async (data) => {    
    await model.create(data);
    return { ...requestResponse.success, data: model };
};

const getById = async (condition) => {
    return model.find(condition, { _id: false }, { lean: true });
};

const getReportAll = async (condition) => {
    return model.aggregate([{
        $match: {
            $and: [
                condition
            ]
        }
    }, {
        $lookup: {
            from: "users",
            localField: "GUID",
            foreignField: "GUID",
            as: "USER_DATA"
        }
    }, ])
};

const updateOne = async (condition, body) => {
    await model.updateOne(condition, body);
    const user = await model.findOne({GUID: condition.GUID}, { _id: false }, { lean: true });
    const result = { ...requestResponse.success, data: {
        user: { ...user }
    }};
    return result;
}

const find = async (condition) => {
    return model.findOne(condition, { _id: false }, { lean: true });
}

module.exports = {
    create,
    getById,
    getReportAll,
    updateOne,
    find
};
