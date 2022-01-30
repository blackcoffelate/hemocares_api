const bcrypt = require("bcrypt");
const model = require("../model/user_model");
const { requestResponse } = require("../utils");

let response;

const create = async (data) => {
    const chekData = await model.findOne({ USERNAME: data.USERNAME }, { _id: false }, { lean: true });
    
    if (chekData !== undefined && chekData !== null) {
        response = { ...requestResponse.unprocessable_entity };
        response.message = "USER SUDAH TERDAFTAR";
        return response;
    }
    
    const password = data.PASSWORD;
    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    data.PASSWORD = hashPassword;
    
    await model.create(data);
    return { ...requestResponse.success, data: model };
};

const getByStatusAll = async (condition) => {
    return model.aggregate([{
        $match: {
            $and: [
                condition
            ]
        }
    }, {
        $lookup: {
            from: "locations",
            localField: "GUID",
            foreignField: "GUID",
            as: "USER_LOCATIONS"
        }
    }, ]).sort({CREATED_AT: -1});
    // return model.find(condition, { _id: false }, { lean: true }).sort({CREATED_AT: -1});
};

const getByStatus = async (condition) => {
    return model.find(condition, { _id: false }, { lean: true }).limit(5).sort({CREATED_AT: -1});
};

const getById = async (condition) => {
    return model.find(condition, { _id: false }, { lean: true });
};

const queryUserByBloodType = (condition) => model.aggregate([
    { $match: condition }, {
        $group: {
            _id: "$BLOOD_TYPE",
            count: {
                $sum: 1
            }
        }
    }
]);

const getCountBloodType = async (condition) => {
    const user = await queryUserByBloodType(condition);
    return {
      ...requestResponse.success,
      data: {
        user
      }
    };
  };

const updateOne = async (condition, body) => {
    await model.updateOne(condition, body);
    const user = await model.findOne({GUID: condition.GUID}, { _id: false }, { lean: true });
    const result = { ...requestResponse.success, data: {
        user: { ...user }
    }};
    return result;
}

const updateStatus = async (condition, body) => {
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
    getByStatusAll,
    getById,
    getByStatus,
    queryUserByBloodType,
    getCountBloodType,
    updateOne,
    updateStatus,
    find
};
