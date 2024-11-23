import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import "./gridModal.scss";

export const GridModal: React.FC = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      disableBodyScroll(modalElement);
    }

    return () => {
      if (modalElement) {
        enableBodyScroll(modalElement);
      }
    };
  }, []);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      navigate(-1);
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal-wrapper"
      onClick={handleOverlayClick}
    >
      <img src="img/icons/white-close.svg" className="close" alt="close" onClick={() => {navigate(-1);}} />
      <div className="modal">
        <img className="modal__img" src="img/main/grid1.jpg" alt="Grid 1" />
        <img className="modal__img" src="img/main/grid2.jpg" alt="Grid 2" />
      </div>
    </div>
  );
};
