import { useState } from "react";

export default function Todo(props) {
    const todo = props.todo;
    const setTodos = props.setTodos;
    
    // State to handle edit mode and the new title
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.todo); // Initially set to the current todo title

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

    // Function to update the title of a todo
    const updateTodoTitle = async (todoId) => {
        const res = await fetch(`/api/todos/content/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ todo: newTitle }), 
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await res.json();

        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, todo: newTitle };
                    }
                    return currentTodo;
                });
            });
            setIsEditing(false); // Exit edit mode after update
        }
    };

    return (
        <div className="todo">
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
            ) : (
                <p>{todo.todo}</p>
            )}
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
                {isEditing ? (
                    <button
                        className="todo__save"
                        onClick={() => updateTodoTitle(todo._id)}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="todo__edit"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}
