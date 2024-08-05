"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chat: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Contact",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    readBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Contact",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const Message = (0, mongoose_1.model)("Message", messageSchema);
exports.default = Message;
