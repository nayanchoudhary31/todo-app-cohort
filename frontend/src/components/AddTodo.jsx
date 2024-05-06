import { useState } from "react";

export function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      <input
        type="text"
        id="title"
        placeholder="Enter todo title here"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        id="description"
        placeholder="Enter todo description here"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <button
        onClick={() => {
          fetch("http://localhost:3001/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            alert("Server says:", JSON.stringify(res));
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
