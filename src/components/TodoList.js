import React, { useState, useEffect, useRef } from 'react';
import axios from '../axiosConfig';
import Layout from './Layout'; // Import the Layout component

const TodoList = ({ token, setToken }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState(null); 
    const ws = useRef(null);

    const connectWebSocket = () => {
        ws.current = new WebSocket('ws://localhost:8080/ws');

        ws.current.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.current.onmessage = (event) => {
            const updatedTodos = JSON.parse(event.data);
            setTodos(updatedTodos);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setError('WebSocket connection error. Please try again later.');
        };

        ws.current.onclose = (event) => {
            console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
            // Reconnect after a delay if the closure was unexpected
            if (event.code !== 1000 && event.code !== 1001) {
                setTimeout(() => {
                    console.log("Reconnecting WebSocket...");
                    connectWebSocket();
                }, 1000);
            }
        };
    };

    useEffect(() => {
        if (!token) return;

        // Fetch initial todos
        axios.get('/todos')
            .then(response => setTodos(response.data))
            .catch(error => {
                console.error('Error fetching todos:', error);
                setError('Failed to fetch todos. Please try again later.');
            });

        // Delay WebSocket connection initialization
        setTimeout(connectWebSocket, 1000);

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [token]);

    const handleAddTodo = () => {
        if (newTodo.trim() === '') return;

        axios.post('/todos', { title: newTodo, completed: false })
            .then(response => {
                setNewTodo('');
                setError(null); // Clear any existing error messages
            })
            .catch(error => {
                console.error('Error adding todo:', error);
                setError('Failed to add todo. Please try again later.');
            });
    };

    const handleToggleTodo = (id) => {
        const todo = todos.find(todo => todo.id === id);
        axios.put(`/todos/${id}`, { ...todo, completed: !todo.completed })
            .then(() => {
                setError(null); 
            })
            .catch(error => {
                console.error('Error updating todo:', error);
                setError('Failed to update todo. Please try again later.');
            });
    };

    const handleDeleteTodo = (id) => {
        axios.delete(`/todos/${id}`)
            .then(() => {
                setError(null); 
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
                setError('Failed to delete todo. Please try again later.');
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    if (!token) {
        return <div>Please log in or register.</div>;
    }

    return (
        <Layout>
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <button 
                    onClick={handleLogout} 
                    className="mb-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Logout
                </button>
                {error && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <div className="mb-4 flex items-center space-x-4">
                    <input 
                        type="text" 
                        value={newTodo} 
                        onChange={(e) => setNewTodo(e.target.value)} 
                        placeholder="New todo"
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button 
                        onClick={handleAddTodo} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Add Todo
                    </button>
                </div>
                <div className="space-y-4">
                    {todos && todos.map(todo => (
                        <div 
                            key={todo.id} 
                            className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300"
                        >
                            <div className="flex items-center gap-4">
                                <input 
                                    type="checkbox" 
                                    checked={todo.completed} 
                                    onChange={() => handleToggleTodo(todo.id)} 
                                    className="mr-2"
                                />
                                <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
                                    {todo.title}
                                </span>
                                <button 
                                    onClick={() => handleDeleteTodo(todo.id)} 
                                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default TodoList;
