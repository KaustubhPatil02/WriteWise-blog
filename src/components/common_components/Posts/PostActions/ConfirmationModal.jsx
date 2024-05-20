import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) {
    return null;
  }

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: '1000',
  };

  const overlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: '1000',
  };

  return (
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
      <h2 className='text-black'>{message}</h2>
<div className=''>
  <button className='text-red-500 font-semibold mr-4' onClick={onConfirm}>Yes</button>
  <button className='text-green-900 font-semibold' onClick={onCancel}>No</button>
</div>
      </div>
    </>
  );
};

export default ConfirmationModal;