import React from 'react';

const PopupWithImage = ({link, name, isOpen, onClose}) => {
  return (
    <div className={`popup popup_type_image popup_dark ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <img className="popup__full-screen-image" src={link} alt="#" />
          <p className="popup__location">{name}</p>
          <button
            onClick={onClose}
            className="button popup__close"
            type="button"
            aria-label="Закрыть модальное окно"
          />
      </div>
    </div>
  );
};

export default PopupWithImage;