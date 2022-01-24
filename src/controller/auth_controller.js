const authService = require("../services/auth_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");

let response;

const login = async (req, res) => {
    let loginResponse;
    
    try {
        const { USERNAME, PASSWORD, ROLE } = req.body;
        
        if (ROLE === "1") {
            loginResponse = await authService.adminLogin({ USERNAME, PASSWORD, ROLE });
        } else if (ROLE === "2") {
            console.log(req.body);
            loginResponse = await authService.userLogin({ USERNAME, PASSWORD, ROLE });
        }
        response = { ...loginResponse };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
};

module.exports = {
    login
};
