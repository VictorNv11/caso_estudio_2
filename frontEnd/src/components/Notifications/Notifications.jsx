// Notifications.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Realiza una solicitud para obtener las notificaciones
    axios.get('http://localhost:8000/api/notifications')
      .then(response => {
        // Una vez obtenidas las notificaciones, actualizamos el estado del componente
        const notifications = response.data.notifications;
        setNotifications(notifications);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []); // Este efecto solo se ejecutará una vez al montar el componente

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {/* Mapea las notificaciones y renderiza cada una como un elemento de lista */}
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
