import React from 'react';

const PopupWithForm = ({name, title, buttonText, children, isOpen, onClose}) => {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          method="post"
          name={name}
          className="popup__form"
          autoComplete="off"
        >
          {children}
          <button className="button popup__submit" type="submit" aria-label={buttonText}>{buttonText}</button>
        </form>
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

export default PopupWithForm;