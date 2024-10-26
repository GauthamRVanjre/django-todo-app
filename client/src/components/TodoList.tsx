import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../queries/queries";
import { TodoType } from "../types";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import { useState } from "react";

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [editingId, setEditingId] = useState<number | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.allTodos.map((todo: TodoType) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <p>{todo.completed ? "Completed" : "Incomplete"}</p>
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
      ))}
    </div>
  );
};

export default TodoList;
