import { useEffect, useState } from "react";
import { AddTodo } from "./components/AddTodo";
import { Todo } from "./components/Todo";
function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("http://localhost:3001/todos");
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await res.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error while fetching todos", error);
      }
    };

    getTodos();
  }, []);

  return (
    <>
      <AddTodo />
      <Todo todos={todos} />
    </>
  );
}

export default App;
