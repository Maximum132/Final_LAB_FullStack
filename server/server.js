const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const Task = require("./models/Task")
const app = express()
app.use(express.json())
app.use(cors({
    origin: "https://your-project.vercel.app"
}))
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
})
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    res.json(task)
})
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(task)
})
app.listen(5000, () => {
    console.log("Server running")
})