import React from 'react';
import Header from '../common/Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-950">
            <Header />

            <main className="ml-80 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;