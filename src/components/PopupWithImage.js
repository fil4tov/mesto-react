import React from 'react';
import {usePopupCloseListeners} from "../hooks";

const PopupWithImage = ({link, name, isOpen, onClose}) => {
  const {handleCloseOnOverlay} = usePopupCloseListeners(isOpen, onClose)

  return (
    <div
      onClick={handleCloseOnOverlay}
      className={`popup popup_type_image popup_dark ${isOpen ? 'popup_opened' : ''}`}
    >
      {Boolean(isOpen) &&
        <div className="popup__container popup__container_image">
          <img className="popup__full-screen-image" src={link} alt={name} />
          <p className="popup__location">{name}</p>
          <button
            onClick={onClose}
            className="button popup__close"
            type="button"
            aria-label="Закрыть модальное окно"
          />
        </div>}
    </div>
  );
};

export default PopupWithImage;