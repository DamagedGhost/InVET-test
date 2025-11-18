import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <--- SIN 'Router'
import AdminHomePage from './pages/AdminHomePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import './App.css';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          {/* Rutas protegidas aquí */}
            <Route path="/admin" element={(<AdminHomePage />)} />
        </Route>

      </Routes>
    </>
  );
}

export default App;