const joi = require("joi");

const registrationAdminScheme = joi.object( {
    username: joi.string().min(5).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});

module.exports = {
    registrationAdminScheme
};