import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Add state for errors

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error before each attempt
        try {
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('token', response.data);
            setToken(response.data);
        } catch (error) {
            setError('Invalid email or password.'); // Set error message
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-300 p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
