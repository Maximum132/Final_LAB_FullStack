import { useState, useEffect } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL
function App() {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    fetchTasks()
  }, [])
  const fetchTasks = async () => {
    const res = await axios.get(API + "/tasks")
    setTasks(res.data)
  }
  return (
    <div>
      <h1>Smart Task Board</h1>
      {tasks.map(t => (
        <div key={t._id}>
          {t.title} - {t.priority}
        </div>
      ))}
    </div>
  )
}
export default App