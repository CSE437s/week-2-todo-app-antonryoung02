import React, { useState } from 'react';
import './NewTodo.css';


async function createItem(title, description, completed) {
    try {
      const response = await fetch('http://localhost:8000/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Item created:', data);
      return data;
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }

function NewTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleNewTodo() {
        // You can add your logic to handle the new todo here
        console.log('New Todo:', { title, description });
        await createItem(title, description, "false");

    };

    return (
        <form className="new-todo-form" onSubmit={(e) => {
            e.preventDefault(); 
            handleNewTodo();
        }}>
            <div className="todo-form-item">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="todo-form-item">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default NewTodo