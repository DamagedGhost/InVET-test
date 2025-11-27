import React from 'react';

const LoadingSpinner = ({ text = "Cargando..." }) => {
    return (
        <div className="loading-container">
            <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 fw-bold animate-pulse">{text}</p>
        </div>
    );
};

export default LoadingSpinner;