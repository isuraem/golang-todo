import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="bg-blue-600 p-4 text-white">
                <h1 className="text-3xl font-bold">Todo App</h1>
            </header>
            <main className="container mx-auto p-4">
                {children}
            </main>
            <footer className="bg-blue-600 p-4 text-white text-center">
                <p>&copy; 2024 Todo App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
