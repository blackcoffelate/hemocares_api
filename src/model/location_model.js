const mongoose = require("mongoose");
const collectionName = "locations";

const LocationSchema = new mongoose.Schema(
    {
        GUID: {
            type: String
        },
        LATITUDE: {
            type: String,
            default: "-"
        },
        LONGITUDE: {
            type: String,
            default: "-"
        },
        STATUS: {
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
  
module.exports = mongoose.model(collectionName, LocationSchema);