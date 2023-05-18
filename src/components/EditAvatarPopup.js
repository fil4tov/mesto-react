import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts";
import {useSubmitButton, useValidation} from "../hooks";
import {useValidationConfig} from "../utils/consts";

const EditAvatarPopup = ({isOpen, onClose, onSubmit}) => {
  const {setCurrentUser} = React.useContext(CurrentUserContext)
  const avatar = useValidation(useValidationConfig)
  const {
    setIsLoading,
    buttonText,
    setButtonText,
    isSubmitDisabled
  } = useSubmitButton({
    initialText: 'Сохранить',
    inputsValidity: [avatar.isValid]
  })

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    setButtonText('Сохранение...')
    onSubmit({avatar: avatar.value})
      .then(userInfo => {
        setCurrentUser(userInfo)
        handleClose()
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
        setButtonText('Сохранить')
      })
  }

  const handleClose = () => {
    avatar.clear()
    onClose()
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={handleClose}
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={avatar.value}
          onChange={avatar.onChange}
          ref={avatar.ref}
          className={avatar.inputClassName}
          type="url"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__input-error">{avatar.error}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;