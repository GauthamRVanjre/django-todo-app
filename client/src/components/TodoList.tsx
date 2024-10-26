import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../queries/queries";
import { TodoType } from "../types";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import "../App.css";
import { useState } from "react";

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
            <button onClick={() => setEditingId(todo.id)}>Edit</button>
            <DeleteTodo id={todo.id} />
            {editingId === todo.id && (
              <EditTodo
                id={todo.id}
                currentTitle={todo.title}
                currentDescription={todo.description}
                onClose={() => setEditingId(null)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
