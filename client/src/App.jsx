import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos")
      const todos = await res.json()
      setMessage(todos.msg)
    }
    getTodos()
  }, [])

  return (
    <main className="container">
      <h1>Todo List</h1>
      {message && <p>{message}</p>}
    </main>
  );
}


