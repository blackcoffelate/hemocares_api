require("dotenv").config();
const service = require("../services/user_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const fileService = require("../services/file_service");
const joi = require("joi");
const fs = require("fs-extra")
const { v4, validate: isUuid } = require("uuid");
const Promise = require("bluebird");
const formidable = Promise.promisifyAll(require("formidable"), { multiArgs: true });
const form = formidable();

let response;

const create = async (req, res) => {
    try {
        req.body.GUID = v4();
        const user = await service.create(req.body);
        response = { ...user };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
};

const getByStatusAll = async (req, res) => {
    try {
        const data = await service.getByStatusAll({ STATUS: req.params.status });
        response = { ...requestResponse.success, data };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
}

const getById = async (req, res) => {
    try {
        const data = await service.getById({ GUID: req.params.guid });
        response = { ...requestResponse.success, data };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
}

const getByStatus = async (req, res) => {
    try {
        const data = await service.getByStatus({ STATUS: req.params.status });
        response = { ...requestResponse.success, data };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
}

const getCountBloodType = async (req, res) => {
    try {
      const data = await service.getCountBloodType(req.body);
      response = { ...data };
    } catch (error) {
      logger.error(error);
      response = { ...requestResponse.server_error };
    }
    res.json(response);
}

const updateOne = async (req, res) => {
    try {
        const [fields] = await form.parseAsync(req);
        console.log(fields)
        
        if (fields.PHOTO !== null){
            const image = Buffer.from(fields.PHOTO, "base64");
            const filename = `${req.params.guid}-${~~(new Date() / 1000)}.png`;
            fs.writeFileSync(`${process.env.IMAGE_PATH}/${filename}`, image);
            fields.PHOTO = filename;
        }
        
        req.body.UPDATED_AT = new Date();
        const data = await service.updateOne({ GUID: req.params.guid }, fields);
        response = { ...requestResponse.success, data };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
}

const updateStatus = async (req, res) => {
    try {
        const data = await service.updateStatus({ GUID: req.params.guid }, req.body);
        response = { ...data };
    } catch (error) {
        logger.error(error);
        response = { ...requestResponse.server_error };
    }
    res.json(response);
}

module.exports = {
    create,
    getByStatusAll,
    getById,
    getByStatus,
    getCountBloodType,
    updateOne,
    updateStatus
};  