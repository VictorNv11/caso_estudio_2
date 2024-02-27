import React from 'react';


const Notification = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {/* Renderizar los detalles de la notificación */}
        </div>
      ))}
    </div>
  );
};

export default Notification;
