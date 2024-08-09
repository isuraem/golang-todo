import React, { useState } from 'react';
import axios from '../axiosConfig';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('token', response.data);
            setToken(response.data);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

// src/pages/Login.js
// import React, { useState } from 'react';
// import axios from '../axiosConfig';
// import Layout from '../components/Layout';

// const Login = ({ setToken }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await axios.post('/login', { email, password });
//             localStorage.setItem('token', response.data);
//             setToken(response.data);
//         } catch (error) {
//             setError('Invalid email or password');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Layout>
//             <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
//                 {error && <div className="mb-4 text-red-600">{error}</div>}
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Email:</label>
//                     <input 
//                         type="email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                         required 
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700">Password:</label>
//                     <input 
//                         type="password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                 </div>
//                 <button 
//                     type="submit" 
//                     disabled={isLoading}
//                     className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
//                         isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//                     }`}
//                 >
//                     {isLoading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//         </Layout>
//     );
// };

// export default Login;

