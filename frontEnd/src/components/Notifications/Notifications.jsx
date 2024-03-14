import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = ({ companyId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Función para cargar las notificaciones
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    // Llama a la función para cargar las notificaciones al montar el componente
    fetchNotifications();
  }, [companyId]);


  return (
    <div className="notifications">
      <h3>Notificaciones</h3>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <strong>ID:</strong> {notification.id}<br />
            <strong>Tipo:</strong> {notification.type}<br />
            <strong>Notificable:</strong> {notification.notifiable}<br />
            <strong>Datos:</strong> {notification.data}<br />
            <strong>Leído:</strong> {notification.read_at ? 'Sí' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
