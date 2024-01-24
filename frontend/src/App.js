import './App.css';
import Todo from './Todo.js';
import {useState, useEffect} from 'react';
import NewTodo from './NewTodo.js';


function App() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    async function fetchTodos() {
      try {
        console.log('Fetching todos...')
        const response = await fetch('http://localhost:8000/items/');
        console.log('Response:', response)
        let data = await response.json();
        console.log('Data:', data)
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchTodos();
  }, []);


  return (
    <div className="App">
      <h1>React App</h1>


      <div className="todo-div-container">
      <NewTodo />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
