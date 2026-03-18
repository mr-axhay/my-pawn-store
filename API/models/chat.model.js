const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    userId: String,
    adminId: String,
    status: {
        type: String,
        default: "open"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Chat",chatSchema);