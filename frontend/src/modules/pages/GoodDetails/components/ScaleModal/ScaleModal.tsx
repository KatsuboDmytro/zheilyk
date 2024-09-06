import React from 'react';
import ReactDOM from 'react-dom';
import './scaleModal.scss';

interface ModalProps {
  img: string | undefined;
  name: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ScaleModal: React.FC<ModalProps> = ({ isOpen, onClose, img, name }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="img-content">
        <div className="img__top" onClick={onClose}>
          <img src="img/icons/white-close.svg" alt="close" />
        </div>
        <div className="img__images">
          <img className='img__img' src={`img${img}`} alt={name} />
        </div>
      </div>
    </div>,
    document.getElementById('scale-img') as HTMLElement,
  );
};

export default ScaleModal;
