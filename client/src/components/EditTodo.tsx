// src/components/EditTodo.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO, GET_TODOS } from "../queries/queries";

interface EditTodoProps {
  id: number;
  currentTitle: string;
  currentDescription: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTodo: React.FC<EditTodoProps> = ({
  id,
  currentTitle,
  currentDescription,
  onClose,
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo({
      variables: { id, title, description },
    });
    onClose(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Todo</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update Todo</button>
      <button type="button" onClick={() => onClose(true)}>
        Cancel
      </button>
    </form>
  );
};

export default EditTodo;
