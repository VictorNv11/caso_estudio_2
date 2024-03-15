import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Modal, ListGroup  } from 'react-bootstrap'; 



const endpoint = 'http://localhost:8000/api'

const Notifications = ({ selectedNotification }) => {
  // const [notifications, setNotifications] = useState([]);
  console.log(selectedNotification)
  // console.log(companyId)
  // useEffect(() => {
  //   // Función para cargar las notificaciones
  //   const fetchNotifications = async (id) => {
  //     try {
  //       console.log(id)
  //       const response = await axios.get(`${endpoint}/notifications/${id}`);
  //       setNotifications(response.data);
  //       showNotificationModal(response.data);
  //     } catch (error) {
  //       console.error('Error al obtener las notificaciones:', error);
  //     }
  //   };

  //   // Llama a la función para cargar las notificaciones al montar el componente
  //   fetchNotifications();
  // }, [companyId]);

  // // Función para mostrar el modal de notificación
  // const showNotificationModal = (notifications) => {
  //   notifications.forEach(notification => {
  //     // Verifica si es una notificación de nuevo usuario registrado
  //     if (notification.type === 'App\\Notifications\\NewUserRegisteredNotification') {
  //       // Muestra un modal con la información del nuevo usuario
  //       alert(`¡Nuevo usuario registrado!\nNombre: ${notification.data.user_name}\nCorreo electrónico: ${notification.data.user_email}`);
  //     }
  //   });
  // };

  return (
    <div className="notifications">
      <h3>Notificaciones</h3>
    </div>
  );
};

export default Notifications;
