import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//PAGES
import Login from './pages/login.jsx';
import Homepage from './pages/homepage.jsx';
import FormRegistro from './pages/formRegistro.jsx';

// SUPERADMINISTRADOR
import ShowSupAdmin from './components/supAdmin/ShowSupAdmin.js';
import EditSupAdmin from './components/supAdmin/EditSupAdmin.js';
import CreateSupAdmin from './components/supAdmin/CreateSupAdmin.js';
import HomePageSupAdmin from './components/supAdmin/homePageSupAdmin.js';

// ADMINISTRADOR
import EditAdmin from './components/Admin/EditAdmin.js';
import ShowAdmin from './components/Admin/showAdmin.js';
import CreateAdmin from './components/Admin/CreateAdmin.js';
import HomePageAdmin from './components/Admin/HomePageAdmin.js';

// USUARIO
import ShowUsuarios from './components/usuarios/ShowUsuarios.js';
import EditUsuarios from './components/usuarios/EditUsuarios.js';
import CreateUsuarios from './components/usuarios/CreateUsuarios.js';
import HomePageUsuario from './components/usuarios/HomePageUsuario.js';
import Showtask from './components/usuarios/Showtask.js'


// EXCEL
import { TodoList } from './components/Clientes/TodoList.jsx';
import EditCliente from './components/Clientes/EditCliente.js';
import ImportCliente from './components/Clientes/ImportClient.js';
import CreateCliente from './components/Clientes/CreateCliente.js';
import Notifications from './components/Notifications/Notifications.jsx';

//COMPAÑIAS
import CompanyForm from './components/Company/FormCompany.jsx'; 
import ShowCompanies from './components/Company/ShowCompany.js';

import { ReseteoContrasena } from './components/Recuperar/ReseteoContrasena.jsx';
import { RecuperarContrasena } from './components/Recuperar/RecuperarContrasena.jsx';



import Pipeline from './components/Company/Pipeline.jsx';
import PerfilUser from './components/usuarios/PerfilUser.jsx';
import Echo from 'laravel-echo';

//  Configuración de Pusher
// const pusher = new Pusher('b84ba64e3b2d8fdd4e3e', {
//   cluster: 'us2'
// });

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: process.env.VITE_PUSHER_APP_KEY,
//   cluster: process.env.VITE_PUSHER_APP_CLUSTER,
//   encrypted: true,
// });

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/formRegistro" element={<FormRegistro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperarContrasena" element={<RecuperarContrasena/>}/>

        {/*Compañias */}
        <Route path="/formCompany" element={<CompanyForm/>}/>
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/showCompanies" element={<ShowCompanies />} />
        <Route path="/ShowCompanies" element={<ShowCompanies />} />
     
        {/* SUEPERADMINISTRADOR */}
        <Route path="/homePageSuperAdmin" element={<HomePageSupAdmin />} />
        <Route path="/supAdmins" element={<ShowSupAdmin />} />
        <Route path="/create" element={<CreateSupAdmin />} />
        <Route path="/edit/:id" element={<EditSupAdmin />} />
        
        {/* EXCEL */}
        <Route path="/password-reset/:token" element={<ReseteoContrasena/>}/> 

     
        {/* SUEPERADMINISTRADOR */}
        <Route path="/homePageSuperAdmin" element={<HomePageSupAdmin />} />
        <Route path="/supAdmins" element={<ShowSupAdmin />} />
        <Route path="/create" element={<CreateSupAdmin />} />
        <Route path="/edit/:id" element={<EditSupAdmin />} />
        
        {/* EXCEL */}
        <Route path="/clientes" element={<ImportCliente/>} />
        <Route path="/createC" element={<CreateCliente />} />
        <Route path="/editC/:id" element={<EditCliente />} />

        <Route path="/servicios" element={<TodoList/>} />

        <Route path="/notifications" element={<Notifications />} />
        
        {/* ADMINISTRADOR */}
        <Route path="homePageAdmin" element={<HomePageAdmin/>}/>
        <Route path="/Admin" element={<ShowAdmin />} />
        <Route path="/createA" element={<CreateAdmin />} />
        <Route path="/editA/:id" element={<EditAdmin />} />

        {/* USUARIOS */}
        <Route path="/usuarios" element={<ShowUsuarios />} />
        <Route path="/createU" element={<CreateUsuarios />} />
        <Route path="/editU/:id" element={<EditUsuarios />} />
        <Route path='/HomePageUsuario' element={<HomePageUsuario/>}/>
        <Route path="/userProfile" element={<PerfilUser />}/>
        <Route path='/Showtask' element={<Showtask/>}/>

      </Routes>
    </BrowserRouter>
  );
}


