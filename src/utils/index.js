require("dotenv").config();
const format = require("date-fns-tz/format");
const id = require("date-fns/locale/id");
const logger = require("./logger");

const checkRequest = (requiredRequest) => {
    return async (req, res, next) => {
        let valid = true;
        
        for (const type in requiredRequest) {
            if (type === "file") {
                if (!(req.file.fieldname === requiredRequest[type])) {
                    if (process.env.NODE_ENV !== "production") {
                        logger.info("MISSING 'file' FIELD");
                    }
                    valid = false;
                }
            } else {
                requiredRequest[type].forEach((parameterName) => {
                    if (!(parameterName in req[type])) {
                        if (process.env.NODE_ENV !== "production") {
                            logger.info(`MISSING ${ parameterName } FIELD`);
                        }
                        valid = false;
                    }
                });
            }
        }
        
        if (!valid) {
            res
            .status(requestResponse.unauthorized.code)
            .json(requestResponse.unauthorized);
        } else {
            next();
        }
    };
};

const checkRequiredProperties = (requiredProperties, properties) => {
    let valid = true;
    
    for (const type in requiredProperties) {
        requiredProperties[type].forEach((parameterName) => {
            if (!(parameterName in properties[type])) {
                if (process.env.NODE_ENV !== "production") {
                    logger.info(`MISSING ${parameterName} FIELD`);
                }
                valid = false;
            }
        });
    }
    return valid;
};
  
const generateCollectionName = (code, name, object) => {
    let str = name.replace(/\s+/g, "_");
    let collectionName = object.toUpperCase() + "_" + code + "_" + str;
    return collectionName;
};
  
const generateCode = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
  
const getCurentDate = async () => {
    return format(new Date(), "dd-mm-yy, HH:mm:ss", { locale: id });
};
  
const requiredRequest = {
    admin_login: { body: ["username", "password"] },
    admin_registration: {
        body: [
            "noreg",
            "fullname",
            "username",
            "password",
            "blood_type",
            "phone",
            "role"
        ]
    },
    authorization: { headers: ["authorization"] },
    login: { body: ["username", "password"] },
    register: {
        fields: [
            "noreg",
            "fullname",
            "username",
            "password",
            "blood_type",
            "phone",
            "role"
        ]
    },
    change_password: {
        body: [
            "email",
            "current_password",
            "new_password",
            "new_password_confirmation"
        ]
    },
    reset_password: { body: ["email"] },
    bind_google_account: { body: ["email", "token"] },
    google_sign_in: { body: ["token"] },
    update_admin_information: {
        body: ["title", "location"],
        headers: ["authorization"]
    },
    create_map_boundaries: {
        body: ["map_boundaries"],
        headers: ["authorization"]
    },
    update_user: {
        body: [
            "name",
            "email",
            "position",
            "id_card",
            "company",
            "unit",
            "phone_number"
        ],
        headers: ["authorization"]
    },
    companies_by_app_type: {
        query: ["app-type"]
    }
};
  
const requestResponse = {
    success: {
        code: 200,
        status: true,
        message: "BERHASIL MEMUAT PERMINTAAN"
    },
    incomplete_body: {
        code: 400,
        status: false,
        message: "PERMINTAAN DALAM MASALAH, CEK PERMINTAAN ANDA"
    },
    unauthorized: {
        code: 401,
        status: false,
        message: "TERJADI KESALAHAN PADA DATA"
    },
    not_found: {
        code: 404,
        status: false,
        message: "FILE TIDAK DITEMUKAN"
    },
    unprocessable_entity: {
        code: 422,
        status: false,
        message: "PERMINTAAN TIDAK DAPAT DI PROSES"
    },
    server_error: {
        code: 500,
        status: false,
        message: "SERVER DALAM GANGGUAN. SILAHKAN KONTAK ADMINISTRATOR"
    }
};
  
module.exports = {
    checkRequest,
    checkRequiredProperties,
    requestResponse,
    requiredRequest,
    generateCode,
    getCurentDate,
    generateCollectionName
};