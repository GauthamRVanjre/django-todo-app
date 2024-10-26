// src/components/DeleteTodo.js
import { useMutation } from "@apollo/client";
import { DELETE_TODO, GET_TODOS } from "../queries/queries";

const DeleteTodo = ({ id }: { id: string }) => {
  const updatedId = parseInt(id);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleDelete = () => {
    deleteTodo({
      variables: { id: updatedId },
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteTodo;
