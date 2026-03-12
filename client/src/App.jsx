import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

const API = "https://final-lab-fullstack.onrender.com"

function App() {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Work")
  const [priority, setPriority] = useState("Medium")

  const fetchTasks = async () => {
    const res = await axios.get(API + "/tasks")
    setTasks(res.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async () => {

    if (!title) {
      alert("Please enter task name")
      return
    }

    await axios.post(API + "/tasks", {
      title: title,
      category: category,
      priority: priority,
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

  return (

    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Smart Task Board</h1>

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

      <hr />

      {tasks.map((t) => (

        <div key={t._id} style={{ margin: "10px" }}>

          <b>{t.title}</b> | {t.category} |

          <span
            style={{
              color:
                t.priority === "High"
                  ? "red"
                  : t.priority === "Medium"
                    ? "orange"
                    : "green"
            }}
          >
            {t.priority}
          </span>

          <button
            onClick={() => toggleStatus(t)}
            style={{ marginLeft: "10px" }}
          >
            {t.status}
          </button>

        </div>

      ))}

    </div>

  )
}

export default App