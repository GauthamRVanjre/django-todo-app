import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="navbar">Todo Application</div>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
