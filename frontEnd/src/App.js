import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import FormRegistro from './pages/formRegistro.jsx';
import Login from './pages/login.jsx';
import ShowSupAdmin from './components/supAdmin/ShowSupAdmin.js';
import CreateSupAdmin from './components/supAdmin/CreateSupAdmin.js';
import EditSupAdmin from './components/supAdmin/EditSupAdmin.js';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/formRegistro" element={<FormRegistro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/supAdmins" element={<ShowSupAdmin />} />
        <Route path="/create" element={<CreateSupAdmin />} />
        <Route path="/edit/:id" element={<EditSupAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}


