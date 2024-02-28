import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;


  return (
    <div className='modal fade show' style={{display: 'block'}}>
        <div className='modal-dialog'>
            <div className='modal-content bg-dark'>
                <div className='modal-header'>
                    <h5 className='modal-title text-white'>{title}</h5>
                </div>
                
            <div >
                <div className='modal-body text-white'>
                    <p>{children}</p>
      
                </div>
            </div>
            <div className='modal-footer'>  
                    <button type='button' className='btn btn-dark border border-primary border-2' onClick={onClose}>
                      Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Modal;
