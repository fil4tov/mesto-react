import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts";
import {useSubmitButton, useValidation} from "../hooks";
import {useValidationConfig} from "../utils/consts";
import api from "../utils/api";

const EditProfilePopup = ({isOpen, onClose}) => {
  const {currentUser, setCurrentUser} = React.useContext(CurrentUserContext)
  const name = useValidation(useValidationConfig)
  const about = useValidation(useValidationConfig)
  const {
    setIsLoading,
    buttonText,
    setButtonText,
    isSubmitDisabled
  } = useSubmitButton({
    initialText: 'Сохранить',
    inputsValidity: [name.isValid, about.isValid]
  })

  React.useEffect(() => {
    name.set(currentUser.name)
    about.set(currentUser.about)
  }, [currentUser, isOpen]);

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    setButtonText('Сохранение...')
    api.updateUserInfo({name: name.value, about: about.value})
      .then(userInfo => {
        setCurrentUser(userInfo)
        onClose()
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
        setButtonText('Сохранить')
      })
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label className="popup__field">
        <input
          value={name.value ?? ''}
          onChange={name.onChange}
          ref={name.ref}
          className={name.inputClassName}
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error">{name.error}</span>
      </label>
      <label className="popup__field">
        <input
          value={about.value ?? ''}
          onChange={about.onChange}
          ref={about.ref}
          className={about.inputClassName}
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error">{about.error}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;