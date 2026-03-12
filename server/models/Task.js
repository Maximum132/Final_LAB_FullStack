const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Work", "Personal", "Study"]
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"]
    },
    status: {
        type: String,
        default: "Pending"
    }
})
module.exports = mongoose.model("Task", taskSchema)