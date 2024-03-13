import React from 'react';

const Pipeline = ({ stage }) => {
    return (
        <div>
            <h2>Pipeline de Creación de Compañía</h2>
            <div>
                <div className={stage === 'Enviado' ? 'active' : ''}>Enviado</div>
                <div className={stage === 'En revisión' ? 'active' : ''}>En revisión</div>
                <div className={stage === 'Aprobado' ? 'active' : ''}>Aprobado</div>
                {/* Agrega más etapas según sea necesario */}
            </div>
        </div>
    );
};

export default Pipeline;
