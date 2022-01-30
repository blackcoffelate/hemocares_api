const bcrypt = require("bcrypt");
const model = require("../model/location_model");
const { requestResponse, checkRequest } = require("../utils");

let response;

const create = async (data) => {
    const chekData = await model.findOne({ GUID: data.GUID }, { _id: false }, { lean: true });
    if (chekData !== undefined && chekData !== null) {
        response = { ...requestResponse.unprocessable_entity };
        response.message = "USER SUDAH TERDAFTAR";
        return response;
    }
    await model.create(data);
    return { ...requestResponse.success, data: model };
}

const getLocations = async (condition) => {
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
    }, ]);
}

const updateLocations = async (condition, body) => {
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
    getLocations,
    updateLocations,
    find
};
