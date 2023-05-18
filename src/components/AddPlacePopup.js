import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {useSubmitButton, useValidation} from "../hooks";
import {useValidationConfig} from "../utils/consts";

const AddPlacePopup = ({isOpen, onClose, onSubmit, cards, setCards}) => {
  const name = useValidation(useValidationConfig)
  const link = useValidation(useValidationConfig)
  const {
    setIsLoading,
    buttonText,
    setButtonText,
    isSubmitDisabled
  } = useSubmitButton({
    initialText: 'Создать',
    inputsValidity: [name.isValid, link.isValid]
  })

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    setButtonText('Создание...')
    onSubmit({link: link.value, name: name.value})
      .then(newCard => {
        setCards([newCard, ...cards])
        handleClose()
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
        setButtonText('Создать')
      })
  }

  const handleClose = () => {
    name.clear()
    link.clear()
    onClose()
  }

  return (
    <PopupWithForm
      name='add'
      title='Добавить пост'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label className="popup__field">
        <input
          value={name.value}
          onChange={name.onChange}
          ref={name.ref}
          className={name.inputClassName}
          type="text"
          placeholder="Место"
          minLength="2"
          maxLength="30"
          required
        />
        <span className='popup__input-error'>{name.error}</span>
      </label>

      <label className="popup__field">
        <input
          value={link.value}
          onChange={link.onChange}
          ref={link.ref}
          className={link.inputClassName}
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error">{link.error}</span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;