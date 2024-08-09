import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
// import './App.css';
import './styles/tailwind.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route 
                        path="/login" 
                        element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} 
                    />
                    <Route 
                        path="/register" 
                        element={token ? <Navigate to="/" /> : <Register setToken={setToken} />} 
                    />
                    <Route 
                        path="/" 
                        element={token ? <TodoList token={token} setToken={setToken} /> : <Navigate to="/login" />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
