import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div className="App">
      <h1>Todo Application</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
