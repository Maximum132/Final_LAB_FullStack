import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

const API = "https://final-lab-fullstack.onrender.com"

function App() {

const [tasks, setTasks] = useState([])
const [title, setTitle] = useState("")
const [category, setCategory] = useState("Work")
const [priority, setPriority] = useState("Medium")
const [filter, setFilter] = useState("All")

const fetchTasks = async () => {
const res = await axios.get(API + "/tasks")
setTasks(res.data)
}

useEffect(() => {
fetchTasks()
}, [])

const addTask = async () => {


if (!title) {
  alert("Enter task name")
  return
}

await axios.post(API + "/tasks", {
  title,
  category,
  priority,
  status: "Pending"
})

setTitle("")
fetchTasks()


}

const toggleStatus = async (task) => {


const newStatus =
  task.status === "Pending"
    ? "Completed"
    : "Pending"

await axios.put(API + "/tasks/" + task._id, {
  status: newStatus
})

fetchTasks()


}

const filteredTasks =
filter === "All"
? tasks
: tasks.filter(t => t.category === filter)

const pending = filteredTasks.filter(t => t.status === "Pending")
const completed = filteredTasks.filter(t => t.status === "Completed")

return (


<div className="container">

  <h1>Smart Task Board</h1>

  <div className="add-box">

    <input
      placeholder="Task name"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option>Work</option>
      <option>Personal</option>
      <option>Study</option>
    </select>

    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>

    <button onClick={addTask}>Add</button>

  </div>

  <div style={{marginBottom:"20px"}}>

    <label>Filter : </label>

    <select
      value={filter}
      onChange={(e)=>setFilter(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Study">Study</option>
    </select>

  </div>

  <div className="board">

    <div className="column">

      <h2>Pending</h2>

      {pending.map(t => (
        <div className="card" key={t._id}>

          <div className="title">{t.title}</div>

          <div className="meta">
            <span>{t.category}</span>

            <span className={
              t.priority === "High"
                ? "high"
                : t.priority === "Medium"
                  ? "medium"
                  : "low"
            }>
              {t.priority}
            </span>
          </div>

          <button
            className="done-btn"
            onClick={() => toggleStatus(t)}
          >
            Complete
          </button>

        </div>
      ))}

    </div>

    <div className="column">

      <h2>Completed</h2>

      {completed.map(t => (
        <div className="card done" key={t._id}>

          <div className="title">{t.title}</div>

          <div className="meta">
            <span>{t.category}</span>

            <span className={
              t.priority === "High"
                ? "high"
                : t.priority === "Medium"
                  ? "medium"
                  : "low"
            }>
              {t.priority}
            </span>
          </div>

          <button
            className="undo-btn"
            onClick={() => toggleStatus(t)}
          >
            Undo
          </button>

        </div>
      ))}

    </div>

  </div>

</div>


)
}

export default App
