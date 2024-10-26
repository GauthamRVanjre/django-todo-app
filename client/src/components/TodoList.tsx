// src/components/TodoList.js
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../queries/queries";
import { TodoType } from "../types";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import "../App.css";

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleEditClick = (todo: TodoType) => {
    setEditingTodo(todo);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
  };

  return (
    <div className="todo-list">
      {data.allTodos.map((todo: TodoType) => (
        <div key={todo.id} className="todo-card">
          <div className="todo-card-header">
            <h4>{todo.title}</h4>
            <p>{todo.completed ? "Completed" : "Incomplete"}</p>
          </div>
          <p>{todo.description}</p>
          <div className="todo-actions">
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <DeleteTodo id={todo.id} />
          </div>
        </div>
      ))}

      {/* Render Edit Modal when editingTodo is set */}
      {editingTodo && (
        <EditTodo
          id={editingTodo.id}
          currentTitle={editingTodo.title}
          currentDescription={editingTodo.description}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default TodoList;
