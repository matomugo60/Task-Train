import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);
// Get todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://td-api-3e6u.onrender.com/todos');
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);
// Add todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://td-api-3e6u.onrender.com/todos', { title, description });
      setTodos([...todos, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };
// Update todo
  const handleUpdateTodo = async (id) => {
    try {
      const updatedTodo = { title: editTitle, description: editDescription };
      const response = await axios.patch(`https://td-api-3e6u.onrender.com/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) => (todo.id === response.data.id ? response.data : todo));
      setTodos(updatedTodos);
      setEditingTodo(null);
      setShowPopup(false);
    } catch (error) {
      console.error(error);
    }
  };
// Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://td-api-3e6u.onrender.com//todos/${id}`);
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      console.error(error);
    }
  };
// Edit todo using a popup
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setShowPopup(true);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={handleAddTodo}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
        onClick={() => handleEditTodo(todo)}
        >
        Edit
        </button>
        <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleDeleteTodo(todo.id)}
        >
        Delete
        </button>
        </td>
        </tr>
        ))}
        </tbody>
        </table>
        {editingTodo && (
        <div className="popup">
        <div className="popup-inner">
        <h2>Edit Todo</h2>
        <form>
        <div className="form-group">
        <label htmlFor="editTitle">Title</label>
        <input
        type="text"
        className="form-control"
        id="editTitle"
        placeholder="Enter title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="editDescription">Description</label>
        <input
        type="text"
        className="form-control"
        id="editDescription"
        placeholder="Enter description"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        />
        </div>
        <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleUpdateTodo(editingTodo.id)}
        >
        Update Todo
        </button>
        <button
        type="button"
        className="btn btn-danger"
        onClick={() => setShowPopup(false)}
        >
        Cancel
        </button>
        </form>
        </div>
        </div>
        )}
        </div>
        );
        };

export default Todo;
