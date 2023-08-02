const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        useremail: {
            type: String,
            default: "",
        },
        isConneted: {
            type: Boolean,
            default: false,
        },
    },
)

const Device = mongoose.model("Device", deviceSchema);
module.exports = { Device };
