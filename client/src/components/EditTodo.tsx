// src/components/EditTodo.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO, GET_TODOS } from "../queries/queries";
import "../App.css";

interface EditTodoProps {
  id: string;
  currentTitle: string;
  currentDescription: string;
  onClose: () => void;
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
      variables: { id: Number(id), title, description, completed: false },
    });
    onClose(); // Close modal after submitting
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Todo</h3>
        <form onSubmit={handleSubmit}>
          <div className="edit-input-container">
            <input
              className="input-text"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="input-text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Update Todo</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
