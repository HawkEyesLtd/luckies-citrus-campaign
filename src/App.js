/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {loading ? (
                <div className="loading-content">
                    <HashLoader color="#00447A" loading={loading} size={150} />
                </div>
            ) : (
                <Dashboard />
            )}
        </>
    );
}

export default App;
