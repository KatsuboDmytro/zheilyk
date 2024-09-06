import React from 'react';
import ReactDOM from 'react-dom';
import './gridModal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GridModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal__top">
          <button className="modal-close" onClick={onClose}>
            <img src="img/icons/close.svg" alt="close" />
          </button>
        </div>
        <div className="modal__images">
          <img className='modal__img' src="img/main/grid1.jpg" alt="grid" />
          <img className='modal__img' src="img/main/grid2.jpg" alt="grid" />
        </div>
      </div>
    </div>,
    document.getElementById('size-grid') as HTMLElement,
  );
};

export default GridModal;
