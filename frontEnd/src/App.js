import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import FormRegistro from './pages/formRegistro.jsx';
import Login from './pages/login.jsx';
import ShowSupAdmin from './components/supAdmin/ShowSupAdmin.js';
import CreateSupAdmin from './components/supAdmin/CreateSupAdmin.js';
import EditSupAdmin from './components/supAdmin/EditSupAdmin.js';
import ShowAdmin from './components/Admin/showAdmin.js';
import CreateAdmin from './components/Admin/CreateAdmin.js';
import EditAdmin from './components/Admin/EditAdmin.js';
import ShowUsuarios from './components/usuarios/ShowUsuarios.js';
import CreateUsuarios from './components/usuarios/CreateUsuarios.js';
import EditUsuarios from './components/usuarios/EditUsuarios.js';
import ImportCliente from './components/Clientes/ImportClient.js';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/formRegistro" element={<FormRegistro />} />
        <Route path="/login" element={<Login />} />

        <Route path="/clientes" element={<ImportCliente/>} />
        
        <Route path="/supAdmins" element={<ShowSupAdmin />} />
        <Route path="/create" element={<CreateSupAdmin />} />
        <Route path="/edit/:id" element={<EditSupAdmin />} />
        
        <Route path="/Admin" element={<ShowAdmin />} />
        <Route path="/createA" element={<CreateAdmin />} />
        <Route path="/editA/:id" element={<EditAdmin />} />

        <Route path="/usuarios" element={<ShowUsuarios />} />
        <Route path="/createU" element={<CreateUsuarios />} />
        <Route path="/editU/:id" element={<EditUsuarios />} />
      </Routes>
    </BrowserRouter>
  );
}


