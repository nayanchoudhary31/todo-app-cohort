export function Todo({ todos }) {
  return (
    <>
      {todos.map((todo) => {
        return (
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button>
              {todo.isCompleted == true ? "Completed" : "Mark as Complteted"}
            </button>
          </div>
        );
      })}
    </>
  );
}
