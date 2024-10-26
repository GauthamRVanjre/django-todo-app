// src/queries/queries.js
import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    allTodos {
      id
      title
      description
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String
    $completed: Boolean
  ) {
    createTodo(
      title: $title
      description: $description
      completed: $completed
    ) {
      todo {
        id
        title
        description
        completed
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: Int!
    $title: String
    $description: String
    $completed: Boolean
  ) {
    updateTodo(
      id: $id
      title: $title
      description: $description
      completed: $completed
    ) {
      todo {
        id
        title
        description
        completed
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      success
    }
  }
`;
