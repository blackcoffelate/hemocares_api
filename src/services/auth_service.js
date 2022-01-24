require("dotenv").config();
const userModel = require("../model/user_model");
const { requestResponse } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const privateKey = process.env.PRIVATE_KEY;

let response;

const adminLogin = async ({ USERNAME, PASSWORD, ROLE }) => {
    const admin = await userModel.findOne({ USERNAME: USERNAME }, { _id: false }, { lean: true });
    
    if (admin === null) {
        response = { ...requestResponse.unauthorized };
        return response;
    }
    
    const comparePassword = await bcrypt.compare(PASSWORD, admin.PASSWORD);
    
    if (!comparePassword) {
        return { ...requestResponse.unauthorized };
    }
  
    if (admin.ROLE === undefined || admin.ROLE === null) {
        return { ...requestResponse.unauthorized };
    }
  
    const token = jwt.sign({
      guid: admin.GUID,
      username: admin.USERNAME,
      password: admin.PASSWORD
    },
    privateKey,{
      expiresIn: "7d"
    });

    const result = { ...requestResponse.success, data: {
        user: { ...admin, ROLE: ROLE },
        token
    }};

    console.log(result);

    return result;
};

const userLogin = async ({ USERNAME, PASSWORD, ROLE }) => {
    const user = await userModel.findOne({ USERNAME: USERNAME }, { _id: false }, { lean: true });
    // console.log(username)
    if (user === null) {
        response = { ...requestResponse.unauthorized };
        return response;
    }

    const comparePassword = await bcrypt.compare(PASSWORD, user.PASSWORD);
    
    if (!comparePassword) {
        return { ...requestResponse.unauthorized };
    }
  
    const token = jwt.sign({
        guid: user.GUID,
        username: user.USERNAME,
        password: user.PASSWORD
    },
    privateKey,{
      expiresIn: "7d"
    });

    const result = { ...requestResponse.success, data: {
        user: { ...user, ROLE: ROLE },
        token
    }};

    console.log(result)
    
    return result;
};

module.exports = {
    adminLogin,
    userLogin
};
