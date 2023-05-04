import React from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

const App = () => {
  const [isPopupEditOpened, setIsPopupEditOpened] = React.useState(false);
  const [isPopupAddOpened, setIsPopupAddOpened] = React.useState(false);
  const [isPopupAvatarOpened, setIsPopupAvatarOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const closeAllPopups = () => {
    setIsPopupAddOpened(false)
    setIsPopupEditOpened(false)
    setIsPopupAvatarOpened(false)
    setSelectedCard({})
  }

  const handleClickCard = ({name, link}) => {
    setSelectedCard({name, link})
  }

  return (
    <>
      <Header/>
      <Main
        onAddPlace={() => setIsPopupAddOpened(true)}
        onEditAvatar={() => setIsPopupAvatarOpened(true)}
        onEditProfile={() => setIsPopupEditOpened(true)}
        handleClickCard={handleClickCard}
      />
      <Footer/>

      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isPopupEditOpened}
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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

      <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        buttonText='Да'
      />

      <PopupWithImage
        {...selectedCard}
        onClose={closeAllPopups}
        isOpen={Object.keys(selectedCard).length}
      />
    </>
  );
};

export default App;
