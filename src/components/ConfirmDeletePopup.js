import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {useSubmitButton} from "../hooks";

const ConfirmDeletePopup = ({isOpen, onClose, onSubmit, cardId, cards, setCards}) => {
  const {
    setIsLoading,
    buttonText,
    setButtonText,
    isSubmitDisabled
  } = useSubmitButton({
    initialText: 'Да',
    inputsValidity: []
  })

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    setButtonText('Удаление...')
    onSubmit(cardId)
      .then(() => {
        setCards(cards.filter(card => card._id !== cardId))
        onClose()
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
        setButtonText('Да')
      })
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
};

export default ConfirmDeletePopup;