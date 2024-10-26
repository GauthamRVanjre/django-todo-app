// src/components/AddTodo.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO, GET_TODOS } from "../queries/queries";

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }], // Refetch to update list
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({
      variables: { title, description, completed: false },
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Todo</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
