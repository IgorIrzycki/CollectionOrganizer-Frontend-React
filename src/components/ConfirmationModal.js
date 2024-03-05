import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/ConfirmationModal.css';

Modal.setAppElement('#root');

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, itemSetName }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="confirmation-modal"
      overlayClassName="confirmation-modal-overlay"
    >
      <h2 className="confirmation-modal-title">Confirm Removal</h2>
      <p className="confirmation-modal-text">
        Are you sure you want to remove the item set <span className="item-set-name">{itemSetName}</span>?
      </p>
      <label className="confirmation-modal-label">
        Enter the item set name to confirm:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="confirmation-modal-input"
        />
      </label>
      <button onClick={handleConfirm} className="confirmation-modal-button confirm-button">
        Yes, Remove
      </button>
      <button onClick={onRequestClose} className="confirmation-modal-button cancel-button">
        Cancel
      </button>
    </Modal>
  );
};

export default ConfirmationModal;
