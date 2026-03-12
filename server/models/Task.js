const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["Work", "Personal", "Study"],
        default: "Work"
    },

    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    },

    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }

})

module.exports = mongoose.model("Task", taskSchema)