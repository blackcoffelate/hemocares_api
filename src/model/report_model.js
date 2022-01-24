const mongoose = require("mongoose");
const collectionName = "report";

const ReportSchema = new mongoose.Schema(
    {
        GUID: {
            type: String
        },
        CONTENT: {
            type: String,
            default: "-"
        },
        REPORT_TYPE: {
            type: String,
            default: "-"
        },
        LATITUDE: {
            type: String,
            default: "-"
        },
        LONGITUDE: {
            type: String,
            default: "-"
        },
        PHOTO: {
            type: String,
            default: "-"
        },
        ADDRESS: {
            type: String,
            default: "-"
        },
        STATUS_USER: {
            type: String,
            default: "-"
        },
        CREATED_AT: {
            type: Date,
            default: new Date()
        },
        UPDATED_AT: {
            type: Date,
            default: new Date()
        }
    },
    {
        versionKey: false,
        collection: collectionName
    });
  
module.exports = mongoose.model(collectionName, ReportSchema);