require("dotenv").config();
const service = require("../services/location_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const { v4, validate: isUuid } = require("uuid");
const Promise = require("bluebird");
const formidable = Promise.promisifyAll(require("formidable"), { multiArgs: true });
const form = formidable();

let response;

const create = async (req, res) => {
    try {
        const user = await service.create(req.body);
        response = { ...user };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
};

const getLocations = async (req, res) => {
    try {
        const data = await service.getLocations(req.body);
        response = { ...requestResponse.success, data };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
}

const updateLocations = async (req, res) => {
    try {
        const data = await service.updateLocations({ GUID: req.params.guid }, req.body);
        response = { ...data };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
}

module.exports = {
    create,
    getLocations,
    updateLocations
};  