const mongoose = require("mongoose");
const collectionName = "users";

const UserSchema = new mongoose.Schema(
    {
        GUID: {
            type: String
        },
        NOREG: {
            type: String,
            default: "-"
        },
        FULLNAME: {
            type: String,
            default: "-"
        },
        USERNAME: {
            type: String,
            default: "-"
        },
        PASSWORD: {
            type: String,
            default: "-"
        },
        EMAIL: {
            type: String,
            default: "-"
        },
        PHONE: {
            type: String,
            default: "-"
        },
        BLOOD_TYPE: {
            type: String,
            default: "-"
        },
        ADDRESS: {
            type: String,
            default: "-"
        },
        AGE: {
            type: String,
            default: "-"
        },
        BIRTHDATE: {
            type: String,
            default: "-"
        },
        STATUS: {
            type: String,
            default: "-"
        },
        RELIGION: {
            type: String,
            default: "-"
        },
        PHOTO: {
            type: String,
            default: "-"
        },
        GENDER: {
            type: String,
            default: "-"
        },
        ROLE: {
            type: String
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

module.exports = mongoose.model(collectionName, UserSchema);