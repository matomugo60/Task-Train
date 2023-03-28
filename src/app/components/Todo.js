import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  // Get todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://td-api-3e6u.onrender.com/todos');
        setTodos(response.data);
      } catch (error) {
        setError('Error fetching todos');
      }
    };
    fetchTodos();
  }, []);

  // Add todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://td-api-3e6u.onrender.com/todos', newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      setError('Error adding todo');
    }
  };

  // Update todo
  const handleUpdateTodo = async (id) => {
    try {
      const response = await axios.put(`https://td-api-3e6u.onrender.com/todos/${id}`, editingTodo);
      const updatedTodos = todos.map((todo) => (todo.id === response.data.id ? response.data : todo));
      setTodos(updatedTodos);
      setEditingTodo(null);
      setShowPopup(false);
    } catch (error) {
      setError('Error updating todo');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://td-api-3e6u.onrender.com/todos/${id}`);
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      setError('Error deleting todo');
    }
  };

  // Edit todo using a popup
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodo({ title: todo.title, description: todo.description });
    setShowPopup(true);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleAddTodo}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
            </div>
            <button type="submit" className="btn btn-primary">
            Add
            </button>
            </form>
            <br />
            <table className="table">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo, index) => (
            <tr key={index}>
            <th scope="row">{todo.id}</th>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>
            <button className="btn btn-success mr-2" onClick={() => handleEditTodo(todo)}>
            Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)}>
            Delete
            </button>
            </td>
            </tr>
            ))}
            </tbody>
            </table>
            {showPopup && (
            <div className="popup">
            <div className="popup-inner">
            <h2>Edit Todo</h2>
            <form>
            <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
            type="text"
            className="form-control"
            id="edit-title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
            </div>
            <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <input
            type="text"
            className="form-control"
            id="edit-description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
            </div>
            <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>
            Cancel
            </button>
            <button type="button" className="btn btn-primary ml-2" onClick={() => handleUpdateTodo(editingTodo.id)}>
            Save
            </button>
            </form>
            </div>
            </div>
            )}
            </div>
            );
            };
            
            export default Todo;
            
            
            
            
