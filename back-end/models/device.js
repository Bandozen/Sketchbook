const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const deviceSchema = new mongoose.Schema(
    {
        useremail: {
            type: String,
            default: "",
        },
        isConnected: {
            type: Boolean,
            default: false,
        },
    },
)

const Device = mongoose.model("Device", deviceSchema);
module.exports = { Device };
