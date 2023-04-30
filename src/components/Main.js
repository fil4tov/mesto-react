import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage";
import Card from "./Card";
import ErrorBlock from "./ErrorBlock";
import api from "../utils/api";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  isPopupEditOpened,
  isPopupAddOpened,
  isPopupAvatarOpened,
  handleClosePopup,
  handleClickCard,
  selectedCard
}) => {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{name, about, avatar}, cards]) => {
        setUserName(name)
        setUserDescription(about)
        setUserAvatar(avatar)
        setCards(cards)
      })
      .catch(setError)
  }, []);

  if (error) {
    return (
      <ErrorBlock
        text='Не удалось загрузить приложение'
        error={error}
      />
    )
  }

  return (
    <main className="main">
      <section className="profile">
        <div
          onClick={onEditAvatar}
          className="profile__avatar-container"
        >
          <img className="profile__avatar" src={userAvatar} alt="Аватарка"/>
          <div className="profile__avatar-edit"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            onClick={onEditProfile}
            className="button profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"/>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="button profile__add-button"
          type="button"
          aria-label="Добавить пост"/>
      </section>
      <section className="gallery" aria-label="Посты пользователя">
        {cards.map(({_id, ...card}) =>
          <Card key={_id} {...card} onImageClick={handleClickCard}/>)}
      </section>

      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isPopupEditOpened}
        onClose={handleClosePopup}
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_type_name"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error name-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_type_about"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error about-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='add'
        title='Добавить пост'
        buttonText='Создать'
        isOpen={isPopupAddOpened}
        onClose={handleClosePopup}
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_type_place"
            name="place"
            placeholder="Место"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error place-error"></span>
        </label>

        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_type_link"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error link-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        buttonText='Сохранить'
        isOpen={isPopupAvatarOpened}
        onClose={handleClosePopup}
      >
        <label className="popup__field">
          <input
            type="url"
            className="popup__input"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="popup__input-error avatar-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithImage
        {...selectedCard}
        onClose={handleClosePopup}
        isOpen={Object.keys(selectedCard).length}
      />
    </main>
  );
};

export default Main;