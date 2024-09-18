export default function Todo(props) {
    const todo = props.todo;
    const setTodos = props.setTodos;


    // Function to delete a todo
    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => currentTodos.filter((currentTodo) => currentTodo._id !== todoId));
        }
    };

    // Function to update the status of a todo
    const updateTodoStatus = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };


    return (
        <div className="todo">
            <p>{todo.todo}</p>
            <div className="mutations">
                <button
                    className="todo__status"
                    onClick={() => updateTodoStatus(todo._id, todo.status)}
                >
                    {todo.status ? "☑" : "☐"}
                </button>
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}
