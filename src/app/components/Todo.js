import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // CRUD Functionality
      const result = [];

      setTodos(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editingTodo) {
      setEditTitle(editingTodo.title);
      setEditDescription(editingTodo.description);
    }
  }, [editingTodo]);
// to use get
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { title, description };
    setTodos([...todos, newTodo]);
    setTitle('');
    setDescription('');
  };
// to use patch
  const handleUpdate = (id, { title, description }) => {
    setEditingTodo({ id, title, description });
    setShowPopup(true);
  };

  const handleSave = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodo.id ? { ...todo, title: editTitle, description: editDescription } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
    setShowPopup(false);
  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };
  
  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
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
                  className="btn btn-sm btn-outline-primary mr-2"
                  onClick={() =>
                    handleUpdate(todo.id, {
                      title: todo.title,
                      description:todo.description,
                    })
                    }
                    >
                    Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(todo.id)}>
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
                    <form onSubmit={handleSave}>
                    <div className="form-group">
                    <label htmlFor="editTitle">Title</label>
                    <input
                    type="text"
                    className="form-control"
                    id="editTitle"
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
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    />
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Save
                    </button>
                    </form>
                    <button className="close-btn" onClick={() => setShowPopup(false)}>
                    X
                    </button>
                    </div>
                    </div>
                    )}
                    </div>
                    );
                    };
                    
                    export default Todo;
