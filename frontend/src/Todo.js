import React from 'react';
import './Todo.css';
function Todo(props) {
  return (
    <div className="todo-div">
      <h1>{props.key}</h1>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>{props.completed}</p>
    </div>
  )
}

export default Todo;